@testset "foursidedcavity.jl" begin
    @testset "construct_BC_matrix" begin
        # Test constructBCMatrix
        #nodes = [1; 1/2; -1/2; -1] 
        D = [19/6 -4 4/3 -1/2; 1 -1/3 -1 1/3; -1/3 1 1/3 -1; 1/2 -4/3 4 -19/6]

        Minvref = [-9 3; -3 9] / 32
        Minv = CF.constructBC_matrix(D)
        @test Minv ≈ Minvref
    end

    @testset "setup_params" begin
        n = 3
        Re = 100
        p = CF.setup_params(n, Re)

        nodes_ref = [1; 1 / 2; -1 / 2; -1]
        D1_ref = [19/6 -4 4/3 -1/2; 1 -1/3 -1 1/3; -1/3 1 1/3 -1; 1/2 -4/3 4 -19/6]

        @test p.nodes ≈ nodes_ref
        @test p.D1 ≈ D1_ref
    end
    @testset "constructBC!" begin
        # Test boundary reconstruction of Ψ when imposing derivatives at boundary
        Ψf(x, y) = @. sin(π * (x - 1) / 2) * sin(π * (y - 1) / 2)
        DΨx(x, y) = @. π / 2 * cos(π * (x - 1) / 2) * sin(π * (y - 1) / 2)
        DΨy(x, y) = @. π / 2 * sin(π * (x - 1) / 2) * cos(π * (y - 1) / 2)

        Ψbcleft(y) = DΨx(1, y)
        Ψbcright(y) = DΨx(-1, y)
        Ψbctop(x) = DΨy(x, 1)
        Ψbcbottom(x) = DΨy(x, -1)

        Re = 100
        n = 8
        p = CF.setup_params(n, Re)

        p.bcleft = Ψbcleft(p.nodes)
        p.bcright = Ψbcright(p.nodes)
        p.bctop = Ψbctop(p.nodes)
        p.bcbottom = Ψbcbottom(p.nodes)

        Ψexact = [Ψf(x, y) for x in p.nodes, y in p.nodes]

        Ψ1 = zeros(n + 1, n + 1)
        Ψ1[3:(n - 1), 3:(n - 1)] = Ψexact[3:(n - 1), 3:(n - 1)]
        CF.constructBC!(Ψ1, p)

        u2 = Ψexact[3:(n - 1), 3:(n - 1)][:]
        Ψ2 = CF.constructBC(u2, p)

        @test Ψ1≈Ψexact atol=1e-6
        @test Ψ2≈Ψexact atol=1e-6
    end
    @testset "construct_homogenousBC!" begin
        n = 6
        Re = 100
        p = CF.setup_params(n, Re)

        u = ones((n - 3) * (n - 3))
        Ψ = zeros(n + 1, n + 1)
        Ψ[3:(n - 1), 3:(n - 1)] = reshape(u, (n - 3, n - 3))

        CF.construct_homogenousBC!(Ψ, p)

        Ψref = [0 0 0 0 0 0 0
                0 0.043402777777778 0.208333333333333 0.208333333333333 0.208333333333333 0.043402777777778 0
                0 0.208333333333333 1.000000000000000 1.000000000000000 1.000000000000000 0.208333333333333 0
                0 0.208333333333333 1.000000000000000 1.000000000000000 1.000000000000000 0.208333333333333 0
                0 0.208333333333333 1.000000000000000 1.000000000000000 1.000000000000000 0.208333333333333 0
                0 0.043402777777778 0.208333333333333 0.208333333333333 0.208333333333333 0.043402777777778 0
                0 0 0 0 0 0 0]

        @test Ψ ≈ Ψref
    end
    @testset "f!" begin
        # Test right-hand-side function of equation for streamfunction 
        # in cavity flow
        n = 6
        Re = 100
        p = CF.setup_params(n, Re)

        u0 = zeros((n - 3) * (n - 3))
        fu = similar(u0)
        CF.f!(fu, u0, p)

        fu_ref = [
            -0.0624820681282460,
            0.576027334953858,
            0.245807608047586,
            -0.642691167651798,
            0.0121206968541711,
            -0.642691167651798,
            0.245807608047580,
            0.576027334953857,
            -0.0624820681282459,
        ]
        @test fu ≈ fu_ref
    end
    @testset "ftime!" begin
        # Test right-hand-side function with time stepping of equation for streamfunction 
        # in cavity flow
        n = 6
        Re = 100
        p = CF.setup_params(n, Re)

        u0 = zeros((n - 3) * (n - 3))
        p.Ψ0 = zeros(n + 1, n + 1)
        fu = similar(u0)

        Δt = 1

        CF.ftime!(fu, u0, p, Δt)
        fu_ref = [
            -0.062482068128246,
            1.821383847328691,
            0.245807608047586,
            -1.888047680026632,
            0.012120696854171,
            -1.888047680026630,
            0.245807608047579,
            1.821383847328690,
            -0.062482068128246,
        ]

        @test fu ≈ fu_ref
    end
end
