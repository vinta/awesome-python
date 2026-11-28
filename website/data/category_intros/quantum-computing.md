Start with Qiskit to build and run quantum circuits in Python, or PennyLane to train them with gradients. QuTiP simulates how a quantum system evolves instead.

How to choose:

- New to quantum computing, or building circuits to run on a simulator or hardware: Qiskit
- Circuits you train with gradients, as in quantum machine learning or variational algorithms: PennyLane
- How a quantum system evolves over time, a different job from building gate circuits: QuTiP
- Device details like qubit placement kept in view as you write the circuit: Cirq

### Qiskit

Start with Qiskit if you're new to quantum computing, or for general circuit work on simulators and hardware. It covers circuits, operators, and the Sampler and Estimator primitives that execute them, plus a transpiler that optimizes circuits for the hardware. The [quickstart](https://quantum.cloud.ibm.com/docs/en/guides/quick-start) builds a Bell state with `QuantumCircuit` and samples it with `StatevectorSampler` on your own machine, no sign-in or API key needed. Its docs lay out the development workflow as [the four steps of a Qiskit pattern](https://quantum.cloud.ibm.com/docs/en/guides/intro-to-patterns): map the problem to circuits, optimize them for the target hardware, execute them, and post-process the results. For real devices, Qiskit's [abstraction layer](https://github.com/Qiskit/qiskit#executing-your-code-on-real-quantum-hardware) runs circuits on hardware from any vendor that provides a compatible interface.

### PennyLane

Pick PennyLane when the circuit is something you train, as in [quantum machine learning and variational algorithms](https://pennylane.ai/topics/quantum-gradients). It computes a circuit's gradients and [hands them to your machine learning library](https://docs.pennylane.ai/en/stable/introduction/interfaces.html), like PyTorch or JAX, whose optimizers then train the circuit. Any of those libraries works with any device. Write the circuit as a Python function, [create a device](https://docs.pennylane.ai/en/stable/introduction/circuits.html#defining-a-device) for a simulator or hardware, and wrap both in a QNode, which you call like a regular Python function.

### Cirq

Pick Cirq when you want the device's details in plain sight as you write the circuit. Its design rests on the belief that a framework for today's noisy quantum computers [needs to be aware of all of the architectural properties of the device](https://quantumai.google/cirq/start/intro). Its docs also [highly discourage hidden compilation](https://quantumai.google/cirq/start/best_practices#what_you_see_is_what_you_get) and tell you to call its transformation routines yourself. It runs circuits on its own simulators and [on hardware from many services](https://quantumai.google/cirq/hardware). Start with [the basics tutorial](https://quantumai.google/cirq/start/basics), which assumes you already know quantum computing. Place qubits on a grid with `cirq.GridQubit`, build a `cirq.Circuit` from them, and run it with `cirq.Simulator()`.

### QuTiP

Pick QuTiP when your question is how a quantum system evolves in time, not which gates a circuit applies. It's [software for simulating the dynamics of closed and open quantum systems](https://github.com/qutip/qutip), like those in quantum optics, trapped ions, or superconducting circuits, and its Hamiltonians can depend on time. States and operators are `Qobj` matrices. Build a Hamiltonian, then pass it to a solver with an initial state and a list of times: [`sesolve()` for a closed system, or `mesolve()` for an open one](https://qutip.readthedocs.io/en/stable/guide/dynamics/dynamics-master.html). Gate circuits live in its companion package, [qutip-qip](https://qutip-qip.readthedocs.io/en/stable/introduction.html).

### Using the libraries together

Picking one library doesn't lock your circuits in. PennyLane's [Qiskit plugin](https://docs.pennylane.ai/projects/qiskit/en/stable/) runs PennyLane circuits on Qiskit's simulators and hardware backends. PennyLane can also [import circuits built in Qiskit](https://docs.pennylane.ai/en/stable/introduction/importing_workflows.html), so you can train a circuit you already have. qutip-qip [simulates circuits made in Qiskit](https://qutip-qip.readthedocs.io/en/stable/qip-qiskit.html).
