def sigmoid(x: float) -> float:
    """Compute the sigmoid of a given value.

    Args:
        x (float): The input value.

    Returns:
        float: The sigmoid of the input value.
    """
    import math
    return 1 / (1 + math.exp(-x))
