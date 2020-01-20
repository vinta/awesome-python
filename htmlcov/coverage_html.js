// Licensed under the Apache License: http://www.apache.org/licenses/LICENSE-2.0
// For details: https://github.com/nedbat/coveragepy/blob/master/NOTICE.txt

// Coverage.py HTML report browser code.
/*jslint browser: true, sloppy: true, vars: true, plusplus: true, maxerr: 50, indent: 4 */
/*global coverage: true, document, window, $ */

coverage = {};

// Find all the elements with shortkey_* class, and use them to assign a shortcut key.
coverage.assign_shortkeys = function () {
    $("*[class*='shortkey_']").each(function (i, e) {
        $.each($(e).attr("class").split(" "), function (i, c) {
            if (/^shortkey_/.test(c)) {
                $(document).bind('keydown', c.substr(9), function () {
                    $(e).click();
                });
            }
        });
    });
};

// Create the events for the help panel.
coverage.wire_up_help_panel = function () {
    $("#keyboard_icon").click(function () {
        // Show the help panel, and position it so the keyboard icon in the
        // panel is in the same place as the keyboard icon in the header.
        $(".help_panel").show();
        var koff = $("#keyboard_icon").offset();
        var poff = $("#panel_icon").position();
        $(".help_panel").offset({
            top: koff.top-poff.top,
            left: koff.left-poff.left
        });
    });
    $("#panel_icon").click(function () {
        $(".help_panel").hide();
    });
};

// Create the events for the filter box.
coverage.wire_up_filter = function () {
    // Cache elements.
    var table = $("table.index");
    var table_rows = table.find("tbody tr");
    var table_row_names = table_rows.find("td.name a");
    var no_rows = $("#no_rows");

    // Create a duplicate table footer that we can modify with dynamic summed values.
    var table_footer = $("table.index tfoot tr");
    var table_dynamic_footer = table_footer.clone();
    table_dynamic_footer.attr('class', 'total_dynamic hidden');
    table_footer.after(table_dynamic_footer);

    // Observe filter keyevents.
    $("#filter").on("keyup change", $.debounce(150, function (event) {
        var filter_value = $(this).val();

        if (filter_value === "") {
            // Filter box is empty, remove all filtering.
            table_rows.removeClass("hidden");

            // Show standard footer, hide dynamic footer.
            table_footer.removeClass("hidden");
            table_dynamic_footer.addClass("hidden");

            // Hide placeholder, show table.
            if (no_rows.length > 0) {
                no_rows.hide();
            }
            table.show();

        }
        else {
            // Filter table items by value.
            var hidden = 0;
            var shown = 0;

            // Hide / show elements.
            $.each(table_row_names, function () {
                var element = $(this).parents("tr");

                if ($(this).text().indexOf(filter_value) === -1) {
                    // hide
                    element.addClass("hidden");
                    hidden++;
                }
                else {
                    // show
                    element.removeClass("hidden");
                    shown++;
                }
            });

            // Show placeholder if no rows will be displayed.
            if (no_rows.length > 0) {
                if (shown === 0) {
                    // Show placeholder, hide table.
                    no_rows.show();
                    table.hide();
                }
                else {
                    // Hide placeholder, show table.
                    no_rows.hide();
                    table.show();
                }
            }

            // Manage dynamic header:
            if (hidden > 0) {
                // Calculate new dynamic sum values based on visible rows.
                for (var column = 2; column < 20; column++) {
                    // Calculate summed value.
                    var cells = table_rows.find('td:nth-child(' + column + ')');
                    if (!cells.length) {
                        // No more columns...!
                        break;
                    }

                    var sum = 0, numer = 0, denom = 0;
                    $.each(cells.filter(':visible'), function () {
                        var ratio = $(this).data("ratio");
                        if (ratio) {
                            var splitted = ratio.split(" ");
                            numer += parseInt(splitted[0], 10);
                            denom += parseInt(splitted[1], 10);
                        }
                        else {
                            sum += parseInt(this.innerHTML, 10);
                        }
                    });

                    // Get footer cell element.
                    var footer_cell = table_dynamic_footer.find('td:nth-child(' + column + ')');

                    // Set value into dynamic footer cell element.
                    if (cells[0].innerHTML.indexOf('%') > -1) {
                        // Percentage columns use the numerator and denominator,
                        // and adapt to the number of decimal places.
                        var match = /\.([0-9]+)/.exec(cells[0].innerHTML);
                        var places = 0;
                        if (match) {
                            places = match[1].length;
                        }
                        var pct = numer * 100 / denom;
                        footer_cell.text(pct.toFixed(places) + '%');
                    }
                    else {
                        footer_cell.text(sum);
                    }
                }

                // Hide standard footer, show dynamic footer.
                table_footer.addClass("hidden");
                table_dynamic_footer.removeClass("hidden");
            }
            else {
                // Show standard footer, hide dynamic footer.
                table_footer.removeClass("hidden");
                table_dynamic_footer.addClass("hidden");
            }
        }
    }));

    // Trigger change event on setup, to force filter on page refresh
    // (filter value may still be present).
    $("#filter").trigger("change");
};

// Loaded on index.html
coverage.index_ready = function ($) {
    // Look for a localStorage item containing previous sort settings:
    var sort_list = [];
    var storage_name = "COVERAGE_INDEX_SORT";
    var stored_list = localStorage.getItem(storage_name);

    if (stored_list) {
        sort_list = JSON.parse('[[' + stored_list + ']]');
    }

    // Create a new widget which exists only to save and restore
    // the sort order:
    $.tablesorter.addWidget({
        id: "persistentSort",

        // Format is called by the widget before displaying:
        format: function (table) {
            if (table.config.sortList.length === 0 && sort_list.length > 0) {
                // This table hasn't been sorted before - we'll use
                // our stored settings:
                $(table).trigger('sorton', [sort_list]);
            }
            else {
                // This is not the first load - something has
                // already defined sorting so we'll just update
                // our stored value to match:
                sort_list = table.config.sortList;
            }
        }
    });

    // Configure our tablesorter to handle the variable number of
    // columns produced depending on report options:
    var headers = [];
    var col_count = $("table.index > thead > tr > th").length;

    headers[0] = { sorter: 'text' };
    for (i = 1; i < col_count-1; i++) {
        headers[i] = { sorter: 'digit' };
    }
    headers[col_count-1] = { sorter: 'percent' };

    // Enable the table sorter:
    $("table.index").tablesorter({
        widgets: ['persistentSort'],
        headers: headers
    });

    coverage.assign_shortkeys();
    coverage.wire_up_help_panel();
    coverage.wire_up_filter();

    // Watch for page unload events so we can save the final sort settings:
    $(window).unload(function () {
        localStorage.setItem(storage_name, sort_list.toString())
    });
};

// -- pyfile stuff --

coverage.pyfile_ready = function ($) {
    // If we're directed to a particular line number, highlight the line.
    var frag = location.hash;
    if (frag.length > 2 && frag[1] === 't') {
        $(frag).addClass('highlight');
        coverage.set_sel(parseInt(frag.substr(2), 10));
    }
    else {
        coverage.set_sel(0);
    }

    $(document)
        .bind('keydown', 'j', coverage.to_next_chunk_nicely)
        .bind('keydown', 'k', coverage.to_prev_chunk_nicely)
        .bind('keydown', '0', coverage.to_top)
        .bind('keydown', '1', coverage.to_first_chunk)
        ;

    $(".button_toggle_run").click(function (evt) {coverage.toggle_lines(evt.target, "run");});
    $(".button_toggle_exc").click(function (evt) {coverage.toggle_lines(evt.target, "exc");});
    $(".button_toggle_mis").click(function (evt) {coverage.toggle_lines(evt.target, "mis");});
    $(".button_toggle_par").click(function (evt) {coverage.toggle_lines(evt.target, "par");});

    coverage.assign_shortkeys();
    coverage.wire_up_help_panel();

    coverage.init_scroll_markers();

    // Rebuild scroll markers when the window height changes.
    $(window).resize(coverage.build_scroll_markers);
};

coverage.toggle_lines = function (btn, cls) {
    btn = $(btn);
    var show = "show_"+cls;
    if (btn.hasClass(show)) {
        $("#source ." + cls).removeClass(show);
        btn.removeClass(show);
    }
    else {
        $("#source ." + cls).addClass(show);
        btn.addClass(show);
    }
    coverage.build_scroll_markers();
};

// Return the nth line div.
coverage.line_elt = function (n) {
    return $("#t" + n);
};

// Return the nth line number div.
coverage.num_elt = function (n) {
    return $("#n" + n);
};

// Set the selection.  b and e are line numbers.
coverage.set_sel = function (b, e) {
    // The first line selected.
    coverage.sel_begin = b;
    // The next line not selected.
    coverage.sel_end = (e === undefined) ? b+1 : e;
};

coverage.to_top = function () {
    coverage.set_sel(0, 1);
    coverage.scroll_window(0);
};

coverage.to_first_chunk = function () {
    coverage.set_sel(0, 1);
    coverage.to_next_chunk();
};

// Return a string indicating what kind of chunk this line belongs to,
// or null if not a chunk.
coverage.chunk_indicator = function (line_elt) {
    var klass = line_elt.attr('class');
    if (klass) {
        var m = klass.match(/\bshow_\w+\b/);
        if (m) {
            return m[0];
        }
    }
    return null;
};

coverage.to_next_chunk = function () {
    var c = coverage;

    // Find the start of the next colored chunk.
    var probe = c.sel_end;
    var chunk_indicator, probe_line;
    while (true) {
        probe_line = c.line_elt(probe);
        if (probe_line.length === 0) {
            return;
        }
        chunk_indicator = c.chunk_indicator(probe_line);
        if (chunk_indicator) {
            break;
        }
        probe++;
    }

    // There's a next chunk, `probe` points to it.
    var begin = probe;

    // Find the end of this chunk.
    var next_indicator = chunk_indicator;
    while (next_indicator === chunk_indicator) {
        probe++;
        probe_line = c.line_elt(probe);
        next_indicator = c.chunk_indicator(probe_line);
    }
    c.set_sel(begin, probe);
    c.show_selection();
};

coverage.to_prev_chunk = function () {
    var c = coverage;

    // Find the end of the prev colored chunk.
    var probe = c.sel_begin-1;
    var probe_line = c.line_elt(probe);
    if (probe_line.length === 0) {
        return;
    }
    var chunk_indicator = c.chunk_indicator(probe_line);
    while (probe > 0 && !chunk_indicator) {
        probe--;
        probe_line = c.line_elt(probe);
        if (probe_line.length === 0) {
            return;
        }
        chunk_indicator = c.chunk_indicator(probe_line);
    }

    // There's a prev chunk, `probe` points to its last line.
    var end = probe+1;

    // Find the beginning of this chunk.
    var prev_indicator = chunk_indicator;
    while (prev_indicator === chunk_indicator) {
        probe--;
        probe_line = c.line_elt(probe);
        prev_indicator = c.chunk_indicator(probe_line);
    }
    c.set_sel(probe+1, end);
    c.show_selection();
};

// Return the line number of the line nearest pixel position pos
coverage.line_at_pos = function (pos) {
    var l1 = coverage.line_elt(1),
        l2 = coverage.line_elt(2),
        result;
    if (l1.length && l2.length) {
        var l1_top = l1.offset().top,
            line_height = l2.offset().top - l1_top,
            nlines = (pos - l1_top) / line_height;
        if (nlines < 1) {
            result = 1;
        }
        else {
            result = Math.ceil(nlines);
        }
    }
    else {
        result = 1;
    }
    return result;
};

// Returns 0, 1, or 2: how many of the two ends of the selection are on
// the screen right now?
coverage.selection_ends_on_screen = function () {
    if (coverage.sel_begin === 0) {
        return 0;
    }

    var top = coverage.line_elt(coverage.sel_begin);
    var next = coverage.line_elt(coverage.sel_end-1);

    return (
        (top.isOnScreen() ? 1 : 0) +
        (next.isOnScreen() ? 1 : 0)
    );
};

coverage.to_next_chunk_nicely = function () {
    coverage.finish_scrolling();
    if (coverage.selection_ends_on_screen() === 0) {
        // The selection is entirely off the screen: select the top line on
        // the screen.
        var win = $(window);
        coverage.select_line_or_chunk(coverage.line_at_pos(win.scrollTop()));
    }
    coverage.to_next_chunk();
};

coverage.to_prev_chunk_nicely = function () {
    coverage.finish_scrolling();
    if (coverage.selection_ends_on_screen() === 0) {
        var win = $(window);
        coverage.select_line_or_chunk(coverage.line_at_pos(win.scrollTop() + win.height()));
    }
    coverage.to_prev_chunk();
};

// Select line number lineno, or if it is in a colored chunk, select the
// entire chunk
coverage.select_line_or_chunk = function (lineno) {
    var c = coverage;
    var probe_line = c.line_elt(lineno);
    if (probe_line.length === 0) {
        return;
    }
    var the_indicator = c.chunk_indicator(probe_line);
    if (the_indicator) {
        // The line is in a highlighted chunk.
        // Search backward for the first line.
        var probe = lineno;
        var indicator = the_indicator;
        while (probe > 0 && indicator === the_indicator) {
            probe--;
            probe_line = c.line_elt(probe);
            if (probe_line.length === 0) {
                break;
            }
            indicator = c.chunk_indicator(probe_line);
        }
        var begin = probe + 1;

        // Search forward for the last line.
        probe = lineno;
        indicator = the_indicator;
        while (indicator === the_indicator) {
            probe++;
            probe_line = c.line_elt(probe);
            indicator = c.chunk_indicator(probe_line);
        }

        coverage.set_sel(begin, probe);
    }
    else {
        coverage.set_sel(lineno);
    }
};

coverage.show_selection = function () {
    var c = coverage;

    // Highlight the lines in the chunk
    $(".linenos .highlight").removeClass("highlight");
    for (var probe = c.sel_begin; probe > 0 && probe < c.sel_end; probe++) {
        c.num_elt(probe).addClass("highlight");
    }

    c.scroll_to_selection();
};

coverage.scroll_to_selection = function () {
    // Scroll the page if the chunk isn't fully visible.
    if (coverage.selection_ends_on_screen() < 2) {
        // Need to move the page. The html,body trick makes it scroll in all
        // browsers, got it from http://stackoverflow.com/questions/3042651
        var top = coverage.line_elt(coverage.sel_begin);
        var top_pos = parseInt(top.offset().top, 10);
        coverage.scroll_window(top_pos - 30);
    }
};

coverage.scroll_window = function (to_pos) {
    $("html,body").animate({scrollTop: to_pos}, 200);
};

coverage.finish_scrolling = function () {
    $("html,body").stop(true, true);
};

coverage.init_scroll_markers = function () {
    var c = coverage;
    // Init some variables
    c.lines_len = $('#source p').length;
    c.body_h = $('body').height();
    c.header_h = $('div#header').height();

    // Build html
    c.build_scroll_markers();
};

coverage.build_scroll_markers = function () {
    var c = coverage,
        min_line_height = 3,
        max_line_height = 10,
        visible_window_h = $(window).height();

    c.lines_to_mark = $('#source').find('p.show_run, p.show_mis, p.show_exc, p.show_exc, p.show_par');
    $('#scroll_marker').remove();
    // Don't build markers if the window has no scroll bar.
    if (c.body_h <= visible_window_h) {
        return;
    }

    $("body").append("<div id='scroll_marker'>&nbsp;</div>");
    var scroll_marker = $('#scroll_marker'),
        marker_scale = scroll_marker.height() / c.body_h,
        line_height = scroll_marker.height() / c.lines_len;

    // Line height must be between the extremes.
    if (line_height > min_line_height) {
        if (line_height > max_line_height) {
            line_height = max_line_height;
        }
    }
    else {
        line_height = min_line_height;
    }

    var previous_line = -99,
        last_mark,
        last_top,
        offsets = {};

    // Calculate line offsets outside loop to prevent relayouts
    c.lines_to_mark.each(function() {
        offsets[this.id] = $(this).offset().top;
    });
    c.lines_to_mark.each(function () {
        var id_name = $(this).attr('id'),
            line_top = Math.round(offsets[id_name] * marker_scale),
            line_number = parseInt(id_name.substring(1, id_name.length));

        if (line_number === previous_line + 1) {
            // If this solid missed block just make previous mark higher.
            last_mark.css({
                'height': line_top + line_height - last_top
            });
        }
        else {
            // Add colored line in scroll_marker block.
            scroll_marker.append('<div id="m' + line_number + '" class="marker"></div>');
            last_mark = $('#m' + line_number);
            last_mark.css({
                'height': line_height,
                'top': line_top
            });
            last_top = line_top;
        }

        previous_line = line_number;
    });
};
