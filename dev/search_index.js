var documenterSearchIndex = {"docs":
[{"location":"functions/","page":"Available Functions","title":"Available Functions","text":"Modules = [FourSidedCavityFlow]","category":"page"},{"location":"functions/#FourSidedCavityFlow.CavityCache","page":"Available Functions","title":"FourSidedCavityFlow.CavityCache","text":"A struct containing the cache variables for the nonlinear function f.\n\n\n\n\n\n","category":"type"},{"location":"functions/#FourSidedCavityFlow.CavityParameters","page":"Available Functions","title":"FourSidedCavityFlow.CavityParameters","text":"A struct containing the parameters for the four-sided cavity flow. The fixed parameters consist of the fields for the discretization and the boundary conditions. The  field Re is meant to be set beforehand to run a simulation for a given Reynolds number. \n\n\n\n\n\n","category":"type"},{"location":"functions/#FourSidedCavityFlow.CavityStruct","page":"Available Functions","title":"FourSidedCavityFlow.CavityStruct","text":"The CavityStruct contains the sub-structs CavityParameters and CavityCache. It is passed   to to the function f!(fu, u, p::CavityStruct) to provide the parameters and the cache for the  evaluation of the nonlinear function.\n\n\n\n\n\n","category":"type"},{"location":"functions/#FourSidedCavityFlow.constructBC!-Tuple{Any, FourSidedCavityFlow.CavityStruct}","page":"Available Functions","title":"FourSidedCavityFlow.constructBC!","text":"construct!BC(Ψ, p)\n\nConstructs the two outer grid points rows and columns from the given boundary conditions. The outer rows and columns of the Ψ matrix will be overridden.\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.constructBC-Tuple{Any, FourSidedCavityFlow.CavityStruct}","page":"Available Functions","title":"FourSidedCavityFlow.constructBC","text":"Ψ = constructBC(u, p)\n\nOut-of-place version of the function constructBC!(Ψ, p). The input is the vector of inner grid points u and the function returns the Ψ matrix with the boundaries reconstructed for the given flow field.\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.constructBC_matrix-Tuple{Any}","page":"Available Functions","title":"FourSidedCavityFlow.constructBC_matrix","text":"Minv = constructBC_matrix(D)\n\nHelper function to return the 2 by 2 matrices needed for the construction of the boundary for the streamfunction. D is the Chebyshev differentiation matrix of the discretization. \n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.construct_homogenousBC!-Tuple{Any, FourSidedCavityFlow.CavityStruct}","page":"Available Functions","title":"FourSidedCavityFlow.construct_homogenousBC!","text":"construct_homogenousBC(Ψ, p)\n\nConstructs the boundaries for the streamfunction matrix Ψ by using homogenous boundary conditions (zero velocities at all lids of the cavity). This is employed in the perturbed solution for the linear stability analysis.\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.continuation_arclength-Tuple{Any, Any, Any, FourSidedCavityFlow.CavityStruct, Any, Any, Any}","page":"Available Functions","title":"FourSidedCavityFlow.continuation_arclength","text":"continuation_arclength(foldercont, Ψ1, Ψ2, p::CavityStruct, Re1, Re2, Re_steps; lsa = false)\n\nArc-length continuation algorithm, which starts with two initial states. It is possible to turn         on linear stability analysis at every continuation step. The Ψ states are saved in a binary format in the destination folder. A file called results.csv gives an overview of the computed continuation steps.\n\nArguments\n\nfoldercont::String: Destination folder for the continuation \nΨ1::Matrix: First streamfunction solution for the streamfunction to start continuation  \nΨ2::Matrix: Second streamfunction solution for the streamfunction to start continuation  \nRe1::Real: Reynolds number of first solution \nRe2::Real: Reynolds number of second solution \nRe_step::Integer: Number of continuation steps \ntimesteps:Integer: Number of timesteps\nlsa::Bool=false: If true a linear stability at every continuation step is performed\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.continuation_arclength-Tuple{Any, Any, FourSidedCavityFlow.CavityStruct, Any, Any, Any}","page":"Available Functions","title":"FourSidedCavityFlow.continuation_arclength","text":"continuation_arclength(foldercont, Ψi, p, Re_start, ΔRe, Re_steps; lsa = false)\n\nArc-length continuation algorithm, which starts with one initial states. The first continuation is performed by doing a natural continuation step. The Ψ states are saved in a binary format in the destination folder. A file called results.csv gives an overview of the computed continuation steps.\n\nArguments\n\nfoldercont::String: Destination folder for the continuation \nΨi::Matrix: Streamfunction solution for the streamfunction to start continuation  \nRe_start::Real: Reynolds number of start solution \nΔRe::Real: Inital step in Reynolds \nRe_step::Integer: Number of continuation steps \nlsa::Bool=false: If true a linear stabilility at every continuaiton step is performed\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.diff_chebyshev-Tuple{Int64}","page":"Available Functions","title":"FourSidedCavityFlow.diff_chebyshev","text":"diff_chebyshev(n)\n\nCompute the Chebyshev differentiation matrix with n + 1 points in the [1, -1]. Returns a vector of nodes and the matrices for the first, second and fourth derivatives.\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.f!-Tuple{Any, Any, FourSidedCavityFlow.CavityStruct}","page":"Available Functions","title":"FourSidedCavityFlow.f!","text":"f!(fu, u, p)\n\nThe nonlinear function for steady-state solutions of the four-sided cavity flow. Evaluates the equation:\n\nF(Psi) = frac1mathrmRe Delta^2 Psi + (partial_x Psi) partial_y(Delta Psi) - (partial_y Psi) partial_x(Delta Psi)\n\nOnly the interior part u (given as a vector) of the streamfunction matrix Ψ is needed,  as the boundary conditions explicitly give the 2 outer rows and columns. fu is a vector where the solution of the function evaluation will be stored.\n\nExample\n\njulia> n = 64; Re = 100; \njulia> p = setup_struct(n, Re) \njulia> Ψ = zeros(n + 1, n+ 1)\njulia> u = Ψ[3:(n - 1), 3:(n - 1)][:]\njulia> fu = similiar(u) \njulia> f!(fu, u, p) \n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.f_linearstability!-Tuple{Any, Any, Any, FourSidedCavityFlow.CavityStruct}","page":"Available Functions","title":"FourSidedCavityFlow.f_linearstability!","text":"f_linearstability!(fu, Ψ, Ψ0, p)\n\nComputes the for a given solution Ψ0 and the eigenfunction Ψ. This function calculates the elements of the matrix A generalized eigenvalue problem. Stores the solution   in fu.\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.ftime!-Tuple{Any, Any, FourSidedCavityFlow.CavityStruct, Any}","page":"Available Functions","title":"FourSidedCavityFlow.ftime!","text":"ftime!(fu, u, p, h)\n\nThe nonlinear function for the time integration of the streamfunction formulation. Solves the equations discretized with an implicit Euler scheme and a timestep h:\n\nF(Psi_i+1) = DeltaPsi_i - DeltaPsi_i+1 + h (frac1mathrmReDelta^2 Psi_i+1 +   (partial_x Psi_i+1) partial_y(Delta Psi_i+1) -   (partial_y Psi_i+1) partial_x(Delta Psi_i+1)) = 0\n\nThe solution of the previous timestep has to be set beforehand by p.params.Ψi.\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.linearstability_lambdamax-Tuple{Any, Any, FourSidedCavityFlow.CavityStruct}","page":"Available Functions","title":"FourSidedCavityFlow.linearstability_lambdamax","text":"linearstability_lambdamax(Re, u, p)\n\nComputes the real part of the rightmost eigenvalues of the linear stability around a base state u and a Reynolds number Re. \n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.linearstability_lambdas-Tuple{Any, FourSidedCavityFlow.CavityStruct}","page":"Available Functions","title":"FourSidedCavityFlow.linearstability_lambdas","text":"linearstability_lambdas(u, p)\n\nComputes the eigenvalues of the linear stability around a base state u. \n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.linearstability_matrices!-Tuple{Any, Any, Any, FourSidedCavityFlow.CavityStruct}","page":"Available Functions","title":"FourSidedCavityFlow.linearstability_matrices!","text":"f_linearstability!(fu, Ψ, Ψ0, p)\n\nComputes the matrices A and B of the linear stability around a base state u.  \n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.newton-Tuple{Function, Any, Any, Any}","page":"Available Functions","title":"FourSidedCavityFlow.newton","text":"x, iter, tol = newton(f!, x0, p, newton_cache; abstol = 1e-10, maxiters = 100)\n\nNewton-Raphson to compute the zero of a multiple-dimensional function f. An in-place version for the function has to be provided f(fx, x, p).\n\nArguments\n\nf!::Function: In-place formulation of multi-dimensional unction, f!(fx, x, p)\nx0::Real: Inital guess\np: Parameters and cache for the function\nnewton_cache::Real: Tuple of variables used to cache for the Newton newton_cache = (x, fx, dx, J, jac_cache),    jac_cache is created for the Jacobian calculation through the package FiniteDiff.jl\nabstol::Real=1e-10: Absolut tolerance  \nmaxiters::Integer=100: Maximum iterations for the Newton algorithm \n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.newton-Tuple{Function, Any, Any}","page":"Available Functions","title":"FourSidedCavityFlow.newton","text":"x, iter, tol = newton(f!, x0, p; abstol = 1e-10, maxiters = 100)\n\nNewton-Raphson to compute the zero of a multiple-dimensional function f. An in-place version for the function has to be provided f(fx, x, p). This function version doesn't use a cache for the Newton and allocates at every call.\n\nArguments\n\nf!::Function: In-place formulation of multi-dimensional function, f!(fx, x, p)\nx0::Real: Inital guess\np: Parameters and cache for the function\nabstol::Real=1e-10: Absolut tolerance  \nmaxiters::Integer=100: Maximum iterations for the Newton algorithm \n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.newton1D","page":"Available Functions","title":"FourSidedCavityFlow.newton1D","text":"x, iter, tol = newton1D(f::Function, x0, p; abstol = 1e-10, maxiters = 100)\n\n1D Newton method. Returns the computed zero x, the number of iterations iter and the absolut tolerance tol. p contains the the parameters for the function such that fx = f(x, p) \n\n\n\n\n\n","category":"function"},{"location":"functions/#FourSidedCavityFlow.newton1D_for_linearstability-Tuple{Any, Any, FourSidedCavityFlow.CavityStruct}","page":"Available Functions","title":"FourSidedCavityFlow.newton1D_for_linearstability","text":"Re, u, iter, tol = newton1D_for_linearstability(Re0, u0, p; abstol = 1e-10, maxiters = 20, verbose = false)\n\n1D Newton to calculates the Reynolds number `Re` where the rightmost eigenvalues real part is 0. `u0` is the initial guess where\nfor the bifurcation. It only works if the state where the bifurcation is has a well-conditioned Jacobian.\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.setup_struct-Tuple{Any, Any}","page":"Available Functions","title":"FourSidedCavityFlow.setup_struct","text":"setup_struct(n, Re)\n\nFunction to instantiate the CavityStruct. Creates a grid of size (n+1) times (n+1). The regularization  parameter for the boundary conditions is fixed to k_0 = 10.\n\nExample\n\njulia> p = setup_struct(64, 1)\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.steadystate-Tuple{Any, FourSidedCavityFlow.CavityStruct}","page":"Available Functions","title":"FourSidedCavityFlow.steadystate","text":"Ψsteady, iter, tol = steady_state(Ψ0, p; abstol = 1e-10, maxiters = 100)\n\nComputes the steady-state solution for the four-sided cavity by employing the Newton algorithm. Returns the calculated steady-state solution from a given initial guess Ψ0 and  the number of iterions iter and tolerance  tol of Newton's method.\n\n\n\n\n\n","category":"method"},{"location":"functions/#FourSidedCavityFlow.timestepping-Tuple{Any, FourSidedCavityFlow.CavityStruct, Any, Any}","page":"Available Functions","title":"FourSidedCavityFlow.timestepping","text":"Ψi = timestepping(Ψinit, p, h, timesteps; savesteps = false, verbose = false)\n\nTimestepping of the equation of motion starting with an initial solution Ψinit and then perfoms a specified number of timesteps using the implicit Euler scheme.\n\nArguments\n\nΨinit::Matrix: Initial streamfunction field to start time-integration \np::CavityStruct: Parameters and cache for the problem. \nh::Real: Timestep size \ntimesteps:Integer: Number of timesteps\nsavesteps::Bool=false: If false only returns the solution of the last timesteps, if true a solution vector of all timesteps and the timeseries\nverbose::Bool=false: If true prints information of the state at each timesteps\n\n\n\n\n\n","category":"method"},{"location":"examples/#Examples","page":"Examples","title":"Examples","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"To set up the four-sided cavity flow problem in Julia, instantiate the struct p, of type CavityStruct, with a Chebyshev polynomial of order n and a Reynolds number mathrmRe. This generates a grid of size (n+1)times(n+1), and all the parameters and cache variables needed to run the simulations. To illustrate, n = 32 is used, which is too small for accurate computations but enough to show how the module works.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FourSidedCavityFlow \nconst CF = FourSidedCavityFlow\n\nn = 32;\nRe = 1;\np = CF.setup_struct(n, Re);","category":"page"},{"location":"examples/#Steady-State-Solutions","page":"Examples","title":"Steady-State Solutions","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"We can run the steadystate function for a given Reynolds number mathrmRe to converge to a steady-state solution with Newton's method. For example the symmetric base solution for a Reynolds of mathrmRe = 50 can be computed by setting the streamfunction matrix to zeros as an initial guess.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"p.params.Re = 50;\nΨ0 = zeros((n + 1), (n + 1));\n\nΨ, iter, tol = CF.steadystate(Ψ0, p);","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The results can be visualized in the physical domain by transposing the Psi matrix and mirror the solution at the y axis. ","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using Plots\n\ncontourf(reverse(p.params.nodes), reverse(p.params.nodes), Ψ', xlim = (-1, 1), \n    ylim = (-1, 1), aspect_ratio = 1, axis = ([], false), color = :davos)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: )","category":"page"},{"location":"examples/#Time-Stepping","page":"Examples","title":"Time-Stepping","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"The asymmetric solutions can be computed by doing time integration.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"p.params.Re = 100;\ntimesteps = 140;\nh = 1;\nΨi = -1e-3 * abs.(randn((n + 1), (n + 1)));\n\nsol, timeseries = CF.timestepping(Ψi, p, h, timesteps, savesteps = true, verbose = true);\n\ncontourf(reverse(p.params.nodes), reverse(p.params.nodes), sol[end, :, :]'; xlim = (-1, 1), \n   ylim = (-1, 1), aspect_ratio = 1, axis = ([], false), color = :davos)\n\nplot(timeseries, sol[:, p.params.ic, p.params.ic]; xlabel = \"time\", ylabel = \"Ψcenter\", label = false)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: ) (Image: )","category":"page"},{"location":"examples/#Pseudo-Arclength-Continuation","page":"Examples","title":"Pseudo-Arclength Continuation","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"We can continue the asymmetric solution branch as a function of the Reynolds number. The obtained solution of the time-stepping above will be converged with the steady-state function. Then the continuation algorithm is started from this Reynolds number. Here a Delta mathrmRe = 1 is chosen.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Re_start = 100;\np.params.Re = Re_start;\nΨs, iter, tol = CF.steadystate(sol[end, :, :], p);\n\nΔRe = 1;\nRe_steps = 200; # as a test\n#Re_steps = 840; # steps needed to capture the complete curve\n\nfoldercont = \"cont\";\nmkdir(foldercont);\nsol_cont, Re_series = CF.continuation_arclength(foldercont, Ψs, p, Re_start, ΔRe, Re_steps);","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The streamfunction at the different Reynolds steps of the continuation is saved in the predefined folder foldercont (as binaries, JLD2 format) and as well returned from the function call. A CSV file called results.csv contains a summary of the computed steps. The summary can be visualized as follows:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using CSV\nusing DataFrames\n\ndf = CSV.read(\"$foldercont/results.csv\", DataFrame)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Let us plot the center value of the streamfunction as a function of the Reynolds number in a bifurcation diagram.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"plot(df.Re, df.psi_c; xlabel = \"Re\", ylabel = \"Ψcenter\", label = false)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: )","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The same can be achieved by using the results stored as binaries or returned from the function call.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using JLD2\nusing FileIO\n\nsol_cont, Re_series = load(\"$foldercont/psis.jld2\", \"sol\", \"Re_series\");\n\nplot(Re_series, sol_cont[:, p.params.ic, p.params.ic]; xlabel = \"Re\", ylabel = \"Ψcenter\", label = false)","category":"page"},{"location":"examples/#Linear-Stability-Analysis","page":"Examples","title":"Linear Stability Analysis","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"A linear stability analysis can be performed within the continuation algorithm by setting the keyword argument lsa = true. Let us compute eigenvalue crossings around the Hopf bifurcation. The already computed asymmetric solutions can be used from the continuation algorithm before.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Re_start = 347;\np.params.Re = Re_start;\n\ndf_upper = filter(row -> row.psi_c > 0.16 || row.psi_c < -0.16 , df);\nidx = argmin(abs.(df_upper.Re .- Re_start));\nrow = df_upper[idx, :];\n\nΨ0 = sol_cont[row.step + 1, :, :] \nΨs, iter, tol = CF.steadystate(Ψ0, p);\n\nΔRe = 0.5;\nRe_steps = 5;\nfolderlsa = \"lsa_hopf\";\nmkdir(folderlsa);\nsol_lsa, lambdas, Re_series = CF.continuation_arclength(folderlsa, Ψs, p, Re_start, ΔRe,\n                                Re_steps, lsa = true);","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Now, as an example, the two largest eigenvalues, corresponding to complex conjugate pair of the Hopf bifurcation, can be plotted by using the generated CSV file of the linear stability analysis.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"df_lsa = CSV.read(\"$folderlsa/results.csv\", DataFrame)\n\nplot(df_lsa.Re, df_lsa.lambda1re; xlabel = \"Re\", ylabel = \"Real(λ)\", marker = :x, \n    label = \"λ1\")\nplot!(df_lsa.Re, df_lsa.lambda2re; marker = :+, label = \"λ2\")","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: )","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"We can see how the real part of the complex conjugate pair of the leading eigenvalues becomes positive at a Reynolds of around 3482. ","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Another possibility is to use the linearstability function to compute the eigenvalues of already computed states. For example, the crossings of the first pitchfork bifurcation","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Re_series = [65.9, 66.0, 66.1, 66.2, 66.3];\nlambdas = Array{ComplexF64}(undef, (5, (n - 3)*(n - 3)));\n\nΨ0 = zeros((n + 1), (n + 1));\n\nfor (i, Re) in enumerate(Re_series)\n    p.params.Re = Re;\n    Ψ, iter, tol = CF.steadystate(Ψ0, p);\n    u = reshape(Ψ[3:(n - 1), 3:(n - 1)], (n - 3) * (n - 3));\n\n    lambdas[i, :] = CF.linearstability_lambdas(u, p);\nend\n\nplot(Re_series, real(lambdas[:, 1]); xlabel = \"Re\", ylabel = \"Real(λ1)\", marker = :x, \n    label = \"λ1\")","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: )","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The first pitchfork bifurcation is located at around mathrmRe = 662. The bifurcation point can be resolved more precisely by using a 1D newton to find the exact Reynolds number for the pitchfork. But this procedure just works if the Jacobian is well-condition at the bifurcation point.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Re = 66.15;\np.params.Re = Re;\n\nΨ, iter, tol = CF.steadystate(Ψ0, p);\nu = reshape(Ψ[3:(n - 1), 3:(n - 1)], (n - 3) * (n - 3));\n\nRe_p1, u_p1, iter, tol = CF.newton1D_for_linearstability(Re, u, p);\ndisplay(Re_p1)","category":"page"},{"location":"reproducibility/#Reproduce-Results","page":"Reproduce Results","title":"Reproduce Results","text":"","category":"section"},{"location":"reproducibility/","page":"Reproduce Results","title":"Reproduce Results","text":"The studies folder in the project directory provides the necessary files to reproduce the results. This folder provides its own Project.toml file and the FourSidedCavityFlow module is accessed as an external package.","category":"page"},{"location":"reproducibility/","page":"Reproduce Results","title":"Reproduce Results","text":"The module can be added locally using a relative path. In the Pkg REPL type :","category":"page"},{"location":"reproducibility/","page":"Reproduce Results","title":"Reproduce Results","text":"pkg>activate .\npkg>dev \"../\"\npkg>instantiate ","category":"page"},{"location":"reproducibility/","page":"Reproduce Results","title":"Reproduce Results","text":"File Description\nrun.jl Entry point, set the grid size, runs files listed below\nstudy_continuation.jl Run pseudo-arclength continuation\nstudy_linearstability.jl Linear stability analysis on points of continuation\nstudy_branch2.jl Continuation of second branch and linear stability analysis\nstudy_periodicorbits.jl Generate periodic orbits of the Hopf bifurcation","category":"page"},{"location":"#FourSidedCavityFlow.jl-Documentation","page":"Home","title":"FourSidedCavityFlow.jl Documentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = FourSidedCavityFlow","category":"page"},{"location":"","page":"Home","title":"Home","text":"The four-sided cavity flow is a two-dimensional flow problem. It is an extension of the simple one-sided lid-driven case, where all lids move with the same velocity profile and parallel lids move in opposite directions.","category":"page"},{"location":"","page":"Home","title":"Home","text":"<center><img src=\"./assets/foursidedcavity.png\"></center>","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_t Delta Psi = frac1mathrmRe Delta^2 Psi\n  + (partial_x Psi) partial_y(Delta Psi)\n  - (partial_y Psi) partial_x(Delta Psi)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This Julia module explores a regularized version of the four-sided lid-driven cavity for incompressible fluids to be used as a validator benchmark for Navier-Stokes solvers. The regularization overcomes the corner singularities which are due to the discontinuous boundary conditions. The considered method recovers exponential convergence with a pseudo-spectral Chebyshev discretization scheme.  ","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This module is not a registered package. To install the FourSidedCavityFlow.jl,  run the following commands in your shell.","category":"page"},{"location":"","page":"Home","title":"Home","text":"git clone https://github.com/morwald/FourSidedCavityFlow.jl.git\ncd FourSidedCavityFlow.jl\njulia","category":"page"},{"location":"","page":"Home","title":"Home","text":"Inside the Julia REPL open the built-in package manager Pkg by pressing ] and then run.","category":"page"},{"location":"","page":"Home","title":"Home","text":"pkg>activate .\npkg>instantiate","category":"page"},{"location":"","page":"Home","title":"Home","text":"This will activate the package and download the necessary dependencies.","category":"page"}]
}
