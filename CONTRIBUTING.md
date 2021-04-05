## Contributing

[fork]: https://github.com/actions/python-versions/fork  
[pr]: https://github.com/actions/python-versions/compare  
[code-of-conduct]: CODE_OF_CONDUCT.md  

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [MIT](LICENSE.md).

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Submitting a pull request

1. [Fork][fork] and clone the repository
1. Create a new branch: `git checkout -b my-branch-name`
1. Make your changes
1. Push to your fork and [submit a pull request][pr]
1. Make sure that checks in your pull request are green

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Please include a summary of the change and which issue is fixed. Also include relevant motivation and context.
- Follow the style guide for [PowerShell](https://github.com/PoshCode/PowerShellPracticeAndStyle).
- Write [good commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

## Code structure

### Directory structure
```
TOOLCACHE-PYTHON-GENERATION
├── azure-pipelines/
|   └──templates/
├── builders/
├── helpers/
├── installers/
└── tests/
    └──sources/
```
- `azure-pipelines*` - contains global YAML definitions for build pipelines. Reusable templates for specific jobs are located in `templates` subfolder.
- `builders` - contains Python builder classes and functions.
- `helpers` - contains global helper functions and functions.
- `installers` - contains installation script templates.
- `tests` - contains test scripts. Required tests sources are located in `sources` subfolder.

\* _We use Azure Pipelines because there are a few features that Actions is still missing, we'll move to Actions as soon as possible_.

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
