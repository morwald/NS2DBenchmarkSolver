function continuation_arclength(Ψi, p::CavityStruct, Re_start, ΔRe, steps; save_steps = 1)
    @unpack n, scl = p.params

    # Create directories
    foldername = "continuation$(n)x$(n)"
    folderpsis = "$(foldername)/psis"
    mkdir(foldername)
    mkdir(folderpsis)

    # Write header and open results file
    fileresults = "$(foldername)/results.csv"
    header = ["step", "Re", "psi_c", "psi_ul", "psi_ur", "psi_ll", "psi_lr", "newton_iterations", "newton_time"]
    writedlm(fileresults, reshape(header,1,length(header)), ',')
    io = open(fileresults, "a")

    p.params.Re = Re_start
    @inbounds u0 = reshape(Ψi[3:(n - 1), 3:(n - 1)], (n - 3) * (n - 3))
    u1, _, _ = newton(f!, u0, p)
    Ψ1 = constructBC(u1, p)
    saveΨ(folderpsis, Ψ1, 0, p.params.Re)
    save_result(io, Ψ1, 0, 0, 0.0, p)
    u1 = [u1; p.params.Re / scl]

    p.params.Re = Re_start + ΔRe
    u2, _, _ = newton(f!, u0, p)
    Ψ2 = constructBC(u2, p)
    saveΨ(folderpsis, Ψ2, 1, p.params.Re)
    save_result(io, Ψ2, 1, 0, 0.0, p)
    u2 = [u2; p.params.Re / scl]

    # Step size norm
    s = norm(u2 - u1)

    for i in 2:(steps)
        time = @elapsed u, iter, _ = newton_for_continuation(f!, u1, u2, s, p)
        u, _, _ = newton_for_continuation(f!, u1, u2, s, p)

        u1 = u2
        u2 = u

        p.params.Re = u[end] * scl
        Ψ = constructBC(u[1:end-1], p)

        if isinteger(i / save_steps)
            saveΨ(folderpsis, Ψ, i, p.params.Re)
        end
        save_result(io, Ψ, i, iter, time, p)
    end
    close(io)
end

function saveΨ(foldername, Ψ, step, Re)
    writedlm("$(foldername)/psi_step$(@sprintf("%03d", step))_Re$(@sprintf("%07.3f", Re)).txt",  Ψ)
end

function save_result(io, Ψ, step, iter, time, p)
    @unpack Re, ic, iul, iur, ill, ilr = p.params 
    result = "$step,$Re,$(Ψ[ic,ic]),$(Ψ[iul,iul]),$(Ψ[iur,iur]),$(Ψ[ill,ill]),$(Ψ[ilr,ilr]),$iter,$(time)\n"
    write(io, result)
    flush(io)
end

function newton_for_continuation(f!::F, x1, x2, s, p::CavityStruct; tolmax = 1e-10,
                                 maxiter = 100) where {F}
    @unpack scl = p.params
    x = copy(x2)
    xi = x[1:(end - 1)]

    dim = size(x, 1) - 1

    eps = 1e-8

    v = x2 - x1
    xp = x2 + (s / norm(v)) * v

    fx = similar(x)
    fxi_Re = zeros(dim)

    J = zeros(dim, dim)
    J2 = zeros(dim + 1, dim + 1)

    dx = zeros(dim + 1)
    cache = FiniteDiff.JacobianCache(xi)

    iter = 0
    tol = 1.0
    while tol > tolmax && iter < maxiter
        p.params.Re = x[end] * scl # unscaled reynolds

        xi = x[1:(end - 1)]
        fxi = fx[1:(end - 1)]

        f!(fxi, xi, p)
        fx[1:(end - 1)] = fxi
        fx[end] = v' * (x - xp)

        FiniteDiff.finite_difference_jacobian!(J, (fxi, xi) -> f!(fxi, xi, p), xi, cache)
        # jacobian!(J, f!, xi, p; dx = eps)

        J2[1:dim, 1:dim] = J

        # Calculate change in "Reynolds variable"
        p.params.Re = (x[end] + eps) * scl # unscaled Reynolds
        f!(fxi_Re, xi, p)
        J2[1:dim, dim + 1] = (fxi_Re - fxi) / eps

        J2[dim + 1, :] = vec(v)

        dx = J2 \ (-fx)
        @. x = x + dx

        tol = norm(dx)
        iter += 1
    end

    return x, iter, tol
end
