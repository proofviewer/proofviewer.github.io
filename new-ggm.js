function ggm_driver() {
    var proof_name = "GGM construction (PRG implies PRF)";

    var monolithic_pkgs = {
        "RO":
        {
            "oracles":
            {
                "EVAL" :
                {
                    "params": ["x"],
                    "code": "@assert |x| = 3;@if T[x] = @bot; @> T[x] @sample  \\{0,1\\}^\\lambda;@return T[x]"
                }
            }
        },

        "Key":
        {
            "state": ["k"],
            "oracles":
            {
                "GET" :
                {
                    "params": [],
                    "code": "@if k = @bot; @> k @sample  \\{0,1\\}^\\lambda;@return k"
                }
            }
        },

        "Mod-prf":
        {
            "oracles":
            {
                "EVAL" :
                {
                    "params": ["x"],
                    "code": "@assert |x| = 3; x_1||...||x_3 @gets x; y @gets \\mathsf{Gprg}\\text{-}x_{1}x_{2}x_{3}.\\mathsf{GET}(); @return y;"
                }

            }
        },

        "Prg-id0":
        {
            "oracles":
            {
                "GET\\text{-}id0" :
                {
                    "params": [],
                    "code": "k @gets \\mathsf{GET}\\text{-}\\mathsf{id}();k_0||k_1 @gets g(k);@return k_0"
                }
            }

        },

        "Prg-id1":
        {
            "oracles":
            {
                "GET\\text{-}id1":
                {
                    "params": [],
                    "code": "k @gets \\mathsf{GET}\\text{-}\\mathsf{id}();k_0||k_1 @gets g(k);@return k_1"
                }
            }
        },

        "Gprg-0":
        {
            "instance": "Prg-id0"
        },
        "Gprg-000":
        {
            "instance": "Prg-id0"
        },

        "Gprg-0^1":
        {
            "instance": "Prg-id1"
        },

        "Key-000":
        { "instance": "Key"
        },
        "Key-001":
        { "instance": "Key"
        },
        "Key-010":
        { "instance": "Key"
        },
        "Key-011":
        { "instance": "Key"
        },
        "Key-100":
        { "instance": "Key"
        },
        "Key-101":
        { "instance": "Key"
        },
        "Key-110":
        { "instance": "Key"
        },
        "Key-111":
        { "instance": "Key"
        },
        "Key-10":
        { "instance": "Key"
        },
        "Key-11":
        { "instance": "Key"
        },
        "Key-00":
        { "instance": "Key"
        },
        "Key-01":
        { "instance": "Key"
        },
        "Key-0":
        { "instance": "Key"
        },
        "Key-1":
        { "instance": "Key"
        },

        "Prg-000":
        { "instance": "Prg-id0"
        },
        "Prg-001":
        { "instance": "Prg-id1"
        },
        "Prg-010":
        { "instance": "Prg-id0"
        },
        "Prg-011":
        { "instance": "Prg-id1"
        },
        "Prg-100":
        { "instance": "Prg-id0"
        },
        "Prg-101":
        { "instance": "Prg-id1"
        },
        "Prg-110":
        { "instance": "Prg-id0"
        },
        "Prg-111":
        { "instance": "Prg-id1"
        },
        "Prg-10":
        { "instance": "Prg-id0"
        },
        "Prg-11":
        { "instance": "Prg-id1"
        },
        "Prg-00":
        { "instance": "Prg-id0"
        },
        "Prg-01":
        { "instance": "Prg-id1"
        },
        "Prg-0":
        { "instance": "Prg-id0"
        },
        "Prg-1":
        { "instance": "Prg-id1"
        }


    };


    var modular_pkgs = {
        "Modular-Gprf":
        {
            "oracles": [["Gprf-cons", "EVAL"]],
            "graph":
            {
                "Gprf-cons": [["Key", "GET"]],
                "Key": []
            },
            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":10,"height":50},"Gprf-cons":{"x":50,"y":0,"width":90,"height":50},"Key":{"x":200,"y":0,"width":90,"height":50, "color":"blue"}},"edges":{"@oracles_interface":{"Gprf-cons":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprf-cons":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[],"Gprf-cons":[]}}

        },
        "\\mathrm{Gprf}^0":
        {
            "oracles": [["Gprf-cons", "EVAL"]],
            "graph":
            {
                "Gprf-cons": [["Key", "GET"]],
                "Key": []
            },
            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":10,"height":50},"Gprf-cons":{"x":50,"y":0,"width":90,"height":50},"Key":{"x":200,"y":0,"width":90,"height":50, "color":"blue"}},"edges":{"@oracles_interface":{"Gprf-cons":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprf-cons":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[],"Gprf-cons":[]}}

        },
        "\\mathrm{Gprf}^1":
        {
            "oracles": [["RO", "EVAL"]],
            "graph":
            {
                "RO": [],
            },
            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":10,"height":50},"RO":{"x":50,"y":0,"width":90,"height":50},
                                "Key":{"x":200,"y":0,"width":90,"height":50, "color":"blue"}},
                       "edges":{"@oracles_interface":{"RO":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}}}
        },
        "GPrg^0_\\text{id}":
        {
            "oracles": [["Prg-0", "GET"], ["Prg-1", "GET"]],

            "graph":
            {
                "Prg-0": [["Key", "GET"]],
                "Prg-1": [["Key", "GET"]],
                "Key": []
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":50,"width":1,"height":50},
                                "Prg-0":{"x":75,"y":0,"width":90,"height":50, "color":"yellow"},
                                "Prg-1":{"x":75,"y":100,"width":90,"height":50, "color":"yellow"},
                                "Key":{"x":200,"y":50,"width":90,"height":50, "color":"blue"}},
                       "edges":{"@oracles_interface":{"Prg-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;",
                                                      "Prg-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},
                                "Prg-0":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},
                                "Prg-1":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},
                       "edge_points":{"@oracles_interface":[],"Mod-prf":[],"Prg-000":[],"Prg-001":[],"Prg-010":[],"Prg-011":[],"Prg-100":[],"Prg-101":[],"Prg-110":[],"Prg-111":[],"Prg-00":[],"Prg-01":[],"Prg-10":[],"Prg-11":[],"Prg-0":[],"Prg-1":[]}}

        },
        "GPrg^1_\\text{id}":
        {
            "oracles": [["Key-0", "GET"], ["Key-1", "GET"]],

            "graph":
            {
                "Key-0": [],
                "Key-1": [],
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":50,"width":1,"height":50},
                                "Key-0":{"x":75,"y":0,"width":90,"height":50, "color":"blue"},
                                "Key-1":{"x":75,"y":100,"width":90,"height":50, "color":"blue"}},
                       "edges":{"@oracles_interface":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;",
                                                      "Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},
                       "edge_points":{"@oracles_interface":[],"Mod-prf":[],"Prg-000":[],"Prg-001":[],"Prg-010":[],"Prg-011":[],"Prg-100":[],"Prg-101":[],"Prg-110":[],"Prg-111":[],"Prg-00":[],"Prg-01":[],"Prg-10":[],"Prg-11":[],"Prg-0":[],"Prg-1":[]}}

        },



        "Modular-Gprf-cons":
        {
            "oracles": [["Gprf-cons", "EVAL"]],
            "graph":
            {
                "Gprf-cons": [],
            },
            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":10,"height":50},"Gprf-cons":{"x":50,"y":0,"width":90,"height":50}},"edges":{"@oracles_interface":{"Gprf-cons":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[]}},
            "outghost":
            {
                "Gprf-cons": {"x":200, "y":25, "style":"exitX=0.999;exitY=0.5;entryX=0;entryY=0.5;exitDx=0;exitDy=0;entryDx=0;entryDy=0;", "label": "GET"}
            }
        },

        "GPrg-id0":
        {
            "oracles": [["Gprg_{x_0}", "GET_{x_0}"], ["Gprg_{x_1}", "GET_{x_1}"]],
            "graph":
            {
                "Gprg_{x_0}": [["Key_x", "GET_x"]],
                "Gprg_{x_1}": [["Key_x", "GET_x"]],
                "Key_x": []
            },
            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":10,"width":1,"height":90},"Gprg_{x_0}":{"x":70,"y":0,"width":90,"height":50,"color":"yellow"},"Gprg_{x_1}":{"x":70,"y":60,"width":90,"height":50,"color":"yellow"},"Key_x":{"x":230,"y":30,"width":90,"height":50,"color":"blue"}},"edges":{"@oracles_interface":{"Gprg_{x_0}":"exitX=0.65;exitY=0.4;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","Gprg_{x_1}":"exitX=0.65;exitY=0.6;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;"},"Gprg_{x_0}":{"Key_x":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.25;entryDx=0;entryDy=0;"},"Gprg_{x_1}":{"Key_x":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.75;entryDx=0;entryDy=0;"}},"edge_points":{"@oracles_interface":[],"Gprg_{x_0}":[],"Gprg_{x_1}":[]}}
        },

        "Prg-id1":
        {
            "oracles": [["Key_{x_0}", "GET_{x_0}"], ["Key_{x_1}", "GET_{x_1}"]],
            "graph":
            {
                "Key_{x_0}": [],
                "Key_{x_1}": []
            },
            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":1,"height":110},"Key_{x_0}":{"x":160,"y":0,"width":90,"height":50,"color":"blue"},"Key_{x_1}":{"x":160,"y":60,"width":90,"height":50, "color":"blue"}},"edges":{"@oracles_interface":{"Key_{x_0}":"exitX=0.6;exitY=0.45;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","Key_{x_1}":"exitX=0.75;exitY=0.65;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;"}},"edge_points":{"@oracles_interface":[]}}
        },

        "RO":
        {
            "oracles": [["RO", "EVAL"]],
            "graph": {
                "RO": []
            },
            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":1,"height":450},"RO":{"x":80,"y":0,"width":90,"height":450, "color": "blue"}},"edges":{"@oracles_interface":{"RO":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[]}}

        },

        "PRF_{GGM}":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Prg-000","GET-000"],["Prg-001","GET-001"],["Prg-010","GET-010"],["Prg-011","GET-011"],["Prg-100","GET-100"],["Prg-101","GET-101"],["Prg-110","GET-110"],["Prg-111","GET-111"]],
                "Prg-000": [["Prg-00", "GET-00"]],
                "Prg-001": [["Prg-00", "GET-00"]],
                "Prg-010": [["Prg-01", "GET-01"]],
                "Prg-011": [["Prg-01", "GET-01"]],
                "Prg-100": [["Prg-10", "GET-10"]],
                "Prg-101": [["Prg-10", "GET-10"]],
                "Prg-110": [["Prg-11", "GET-11"]],
                "Prg-111": [["Prg-11", "GET-11"]],
                "Prg-00": [["Prg-0", "GET-0"]],
                "Prg-01": [["Prg-0", "GET-0"]],
                "Prg-10": [["Prg-1", "GET-1"]],
                "Prg-11": [["Prg-1", "GET-1"]],
                "Prg-0": [],
                "Prg-1": []
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},
                                "Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Prg-000":{"x":150, "color":"yellow","y":0,"width":90,"height":50, "color":"yellow"},"Prg-001":{"x":150, "color":"yellow","y":60,"width":90,"height":50, "color":"yellow"},"Prg-010":{"x":150, "color":"yellow","y":120,"width":90,"height":50, "color":"yellow"},"Prg-011":{"x":150, "color":"yellow","y":180,"width":90,"height":50, "color":"yellow"},"Prg-100":{"x":150, "color":"yellow","y":240,"width":90,"height":50, "color":"yellow"},"Prg-101":{"x":150, "color":"yellow","y":300,"width":90,"height":50, "color":"yellow"},"Prg-110":{"x":150, "color":"yellow","y":360,"width":90,"height":50, "color":"yellow"},"Prg-111":{"x":150, "color":"yellow","y":420,"width":90,"height":50, "color":"yellow"},"Prg-00":{"x":310,"y":30,"width":90,"height":50, "color":"yellow"},"Prg-01":{"x":310,"y":150, "color":"yellow","width":90,"height":50, "color":"yellow"},"Prg-10":{"x":310,"y":270,"width":90,"height":50, "color":"yellow"},"Prg-11":{"x":310,"y":390,"width":90,"height":50, "color":"yellow"},"Prg-0":{"x":440,"y":90,"width":90,"height":50, "color":"yellow"},"Prg-1":{"x":440,"y":330,"width":90,"height":50, "color":"yellow"},"Key":{"x":570,"y":210,"width":90,"height":50, "color":"blue"}},"edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Prg-000":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-001":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-010":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-011":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-100":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-101":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-110":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-111":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-000":{"Prg-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-001":{"Prg-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-010":{"Prg-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-011":{"Prg-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-100":{"Prg-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-101":{"Prg-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-110":{"Prg-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-111":{"Prg-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-00":{"Prg-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-01":{"Prg-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-10":{"Prg-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-11":{"Prg-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-0":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-1":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[],"Mod-prf":[],"Prg-000":[],"Prg-001":[],"Prg-010":[],"Prg-011":[],"Prg-100":[],"Prg-101":[],"Prg-110":[],"Prg-111":[],"Prg-00":[],"Prg-01":[],"Prg-10":[],"Prg-11":[],"Prg-0":[],"Prg-1":[]}},

            "outghost":
            {
                "Prg-0": {"x":600, "y":115, "style":"exitX=0.999;exitY=0.5;entryX=0.111;entryY=0.222;exitDx=0;exitDy=0.5;entryDx=0;entryDy=0;", "label": "GET"},
                "Prg-1": {"x": 600, "y":355, "style":"exitX=0.999;exitY=0.5;entryX=0.111;entryY=0.222;exitDx=0;exitDy=0;entryDx=0;entryDy=0;", "label": "GET"}
            },

        },

        "Gprf(PRF_{GGM})":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Prg-000","GET-000"],["Prg-001","GET-001"],["Prg-010","GET-010"],["Prg-011","GET-011"],["Prg-100","GET-100"],["Prg-101","GET-101"],["Prg-110","GET-110"],["Prg-111","GET-111"]],
                "Prg-000": [["Prg-00", "GET-00"]],
                "Prg-001": [["Prg-00", "GET-00"]],
                "Prg-010": [["Prg-01", "GET-01"]],
                "Prg-011": [["Prg-01", "GET-01"]],
                "Prg-100": [["Prg-10", "GET-10"]],
                "Prg-101": [["Prg-10", "GET-10"]],
                "Prg-110": [["Prg-11", "GET-11"]],
                "Prg-111": [["Prg-11", "GET-11"]],
                "Prg-00": [["Prg-0", "GET-0"]],
                "Prg-01": [["Prg-0", "GET-0"]],
                "Prg-10": [["Prg-1", "GET-1"]],
                "Prg-11": [["Prg-1", "GET-1"]],
                "Prg-0": [["Key", "GET"]],
                "Prg-1": [["Key", "GET"]],
                "Key": []
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},
                                "Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Prg-000":{"x":150, "color":"yellow","y":0,"width":90,"height":50, "color":"yellow"},"Prg-001":{"x":150, "color":"yellow","y":60,"width":90,"height":50, "color":"yellow"},"Prg-010":{"x":150, "color":"yellow","y":120,"width":90,"height":50, "color":"yellow"},"Prg-011":{"x":150, "color":"yellow","y":180,"width":90,"height":50, "color":"yellow"},"Prg-100":{"x":150, "color":"yellow","y":240,"width":90,"height":50, "color":"yellow"},"Prg-101":{"x":150, "color":"yellow","y":300,"width":90,"height":50, "color":"yellow"},"Prg-110":{"x":150, "color":"yellow","y":360,"width":90,"height":50, "color":"yellow"},"Prg-111":{"x":150, "color":"yellow","y":420,"width":90,"height":50, "color":"yellow"},"Prg-00":{"x":310,"y":30,"width":90,"height":50, "color":"yellow"},"Prg-01":{"x":310,"y":150, "color":"yellow","width":90,"height":50, "color":"yellow"},"Prg-10":{"x":310,"y":270,"width":90,"height":50, "color":"yellow"},"Prg-11":{"x":310,"y":390,"width":90,"height":50, "color":"yellow"},"Prg-0":{"x":440,"y":90,"width":90,"height":50, "color":"yellow"},"Prg-1":{"x":440,"y":330,"width":90,"height":50, "color":"yellow"},"Key":{"x":570,"y":210,"width":90,"height":50, "color":"blue"}},"edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Prg-000":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-001":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-010":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-011":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-100":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-101":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-110":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-111":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-000":{"Prg-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-001":{"Prg-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-010":{"Prg-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-011":{"Prg-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-100":{"Prg-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-101":{"Prg-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-110":{"Prg-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-111":{"Prg-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-00":{"Prg-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-01":{"Prg-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-10":{"Prg-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-11":{"Prg-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-0":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-1":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[],"Mod-prf":[],"Prg-000":[],"Prg-001":[],"Prg-010":[],"Prg-011":[],"Prg-100":[],"Prg-101":[],"Prg-110":[],"Prg-111":[],"Prg-00":[],"Prg-01":[],"Prg-10":[],"Prg-11":[],"Prg-0":[],"Prg-1":[]}}

        },


        "Hybrid_{0}":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Prg-000","GET-000"],["Prg-001","GET-001"],["Prg-010","GET-010"],["Prg-011","GET-011"],["Prg-100","GET-100"],["Prg-101","GET-101"],["Prg-110","GET-110"],["Prg-111","GET-111"]],
                "Prg-000": [["Prg-00", "GET-00"]],
                "Prg-001": [["Prg-00", "GET-00"]],
                "Prg-010": [["Prg-01", "GET-01"]],
                "Prg-011": [["Prg-01", "GET-01"]],
                "Prg-100": [["Prg-10", "GET-10"]],
                "Prg-101": [["Prg-10", "GET-10"]],
                "Prg-110": [["Prg-11", "GET-11"]],
                "Prg-111": [["Prg-11", "GET-11"]],
                "Prg-00": [["Key-0", "GET-0"]],
                "Prg-01": [["Key-0", "GET-0"]],
                "Prg-10": [["Key-1", "GET-1"]],
                "Prg-11": [["Key-1", "GET-1"]],
                "Key-0": [[]],
                "Key-1": [[]]
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},
                                "Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Prg-000":{"x":150, "color":"yellow","y":0,"width":90,"height":50, "color":"yellow"},"Prg-001":{"x":150, "color":"yellow","y":60,"width":90,"height":50, "color":"yellow"},"Prg-010":{"x":150, "color":"yellow","y":120,"width":90,"height":50, "color":"yellow"},"Prg-011":{"x":150, "color":"yellow","y":180,"width":90,"height":50, "color":"yellow"},"Prg-100":{"x":150, "color":"yellow","y":240,"width":90,"height":50, "color":"yellow"},"Prg-101":{"x":150, "color":"yellow","y":300,"width":90,"height":50, "color":"yellow"},"Prg-110":{"x":150, "color":"yellow","y":360,"width":90,"height":50, "color":"yellow"},"Prg-111":{"x":150, "color":"yellow","y":420,"width":90,"height":50, "color":"yellow"},"Prg-00":{"x":310,"y":30,"width":90,"height":50, "color":"yellow"},"Prg-01":{"x":310,"y":150, "color":"yellow","width":90,"height":50, "color":"yellow"},"Prg-10":{"x":310,"y":270,"width":90,"height":50, "color":"yellow"},"Prg-11":{"x":310,"y":390,"width":90,"height":50, "color":"yellow"},"Key-0":{"x":440,"y":90,"width":90,"height":50, "color":"blue"},"Key-1":{"x":440,"y":330,"width":90,"height":50, "color":"blue"},"Key":{"x":570,"y":210,"width":90,"height":50, "color":"blue"}},"edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Prg-000":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-001":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-010":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-011":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-100":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-101":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-110":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-111":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-000":{"Prg-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-001":{"Prg-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-010":{"Prg-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-011":{"Prg-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-100":{"Prg-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-101":{"Prg-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-110":{"Prg-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-111":{"Prg-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-00":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-01":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-10":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-11":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-0":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-1":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[],"Mod-prf":[],"Prg-000":[],"Prg-001":[],"Prg-010":[],"Prg-011":[],"Prg-100":[],"Prg-101":[],"Prg-110":[],"Prg-111":[],"Prg-00":[],"Prg-01":[],"Prg-10":[],"Prg-11":[],"Key-0":[],"Key-1":[]}}
        },

        "Hybrid_{1}":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Prg-000","GET-000"],["Prg-001","GET-001"],["Prg-010","GET-010"],["Prg-011","GET-011"],["Prg-100","GET-100"],["Prg-101","GET-101"],["Prg-110","GET-110"],["Prg-111","GET-111"]],
                "Prg-000": [["Key-00", "GET-00"]],
                "Prg-001": [["Key-00", "GET-00"]],
                "Prg-010": [["Key-01", "GET-01"]],
                "Prg-011": [["Key-01", "GET-01"]],
                "Prg-100": [["Prg-10", "GET-10"]],
                "Prg-101": [["Prg-10", "GET-10"]],
                "Prg-110": [["Prg-11", "GET-11"]],
                "Prg-111": [["Prg-11", "GET-11"]],
                "Key-00": [[]],
                "Key-01": [[]],
                "Prg-10": [["Key-1", "GET-1"]],
                "Prg-11": [["Key-1", "GET-1"]],
                "Key-1": [[]]
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},
                                "Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Prg-000":{"x":150, "color":"yellow","y":0,"width":90,"height":50, "color":"yellow"},"Prg-001":{"x":150, "color":"yellow","y":60,"width":90,"height":50, "color":"yellow"},"Prg-010":{"x":150, "color":"yellow","y":120,"width":90,"height":50, "color":"yellow"},"Prg-011":{"x":150, "color":"yellow","y":180,"width":90,"height":50, "color":"yellow"},"Prg-100":{"x":150, "color":"yellow","y":240,"width":90,"height":50, "color":"yellow"},"Prg-101":{"x":150, "color":"yellow","y":300,"width":90,"height":50, "color":"yellow"},"Prg-110":{"x":150, "color":"yellow","y":360,"width":90,"height":50, "color":"yellow"},"Prg-111":{"x":150, "color":"yellow","y":420,"width":90,"height":50, "color":"yellow"},"Key-00":{"x":310,"y":30,"width":90,"height":50, "color":"blue"},"Key-01":{"x":310,"y":150, "color":"blue","width":90,"height":50},"Prg-10":{"x":310,"y":270,"width":90,"height":50, "color":"yellow"},"Prg-11":{"x":310,"y":390,"width":90,"height":50, "color":"yellow"},"Key-0":{"x":440,"y":90,"width":90,"height":50, "color":"blue"},"Key-1":{"x":440,"y":330,"width":90,"height":50, "color":"blue"},"Key":{"x":570,"y":210,"width":90,"height":50, "color":"blue"}},"edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Prg-000":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-001":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-010":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-011":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-100":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-101":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-110":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-111":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-000":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-001":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-010":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-011":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-100":{"Prg-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-101":{"Prg-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-110":{"Prg-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-111":{"Prg-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-00":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-01":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-10":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-11":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-0":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-1":{"Key":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[],"Mod-prf":[],"Prg-000":[],"Prg-001":[],"Prg-010":[],"Prg-011":[],"Prg-100":[],"Prg-101":[],"Prg-110":[],"Prg-111":[],"Key-00":[],"Key-01":[],"Prg-10":[],"Prg-11":[],"Key-0":[],"Key-1":[]}}
        },

        "Hybrid_{00}":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Prg-000","GET-000"],["Prg-001","GET-001"],["Prg-010","GET-010"],["Prg-011","GET-011"],["Prg-100","GET-100"],["Prg-101","GET-101"],["Prg-110","GET-110"],["Prg-111","GET-111"]],
                "Prg-000": [["Key-00", "GET-00"]],
                "Prg-001": [["Key-00", "GET-00"]],
                "Prg-010": [["Key-01", "GET-01"]],
                "Prg-011": [["Key-01", "GET-01"]],
                "Prg-100": [["Key-10", "GET-10"]],
                "Prg-101": [["Key-10", "GET-10"]],
                "Prg-110": [["Key-11", "GET-11"]],
                "Prg-111": [["Key-11", "GET-11"]],
                "Key-00": [[]],
                "Key-01": [[]],
                "Key-10": [[]],
                "Key-11": [[]],
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},"Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Prg-000":{"x":150, "color":"yellow","y":0,"width":90,"height":50, "color":"yellow"},"Prg-001":{"x":150, "color":"yellow","y":60,"width":90,"height":50, "color":"yellow"},"Prg-010":{"x":150, "color":"yellow","y":120,"width":90,"height":50, "color":"yellow"},"Prg-011":{"x":150, "color":"yellow","y":180,"width":90,"height":50, "color":"yellow"},"Prg-100":{"x":150, "color":"yellow","y":240,"width":90,"height":50, "color":"yellow"},"Prg-101":{"x":150, "color":"yellow","y":300,"width":90,"height":50, "color":"yellow"},"Prg-110":{"x":150, "color":"yellow","y":360,"width":90,"height":50, "color":"yellow"},"Prg-111":{"x":150, "color":"yellow","y":420,"width":90,"height":50, "color":"yellow"},"Key-00":{"x":310,"y":30,"width":90,"height":50, "color":"blue"},"Key-01":{"x":310,"y":150, "color":"blue","width":90,"height":50},"Key-10":{"x":310,"y":270,"width":90,"height":50, "color":"blue"},"Key-11":{"x":310,"y":390,"width":90,"height":50, "color":"blue"}},
                       "edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Prg-000":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-001":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-010":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-011":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-100":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-101":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-110":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-111":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-000":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-001":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-010":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-011":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-100":{"Key-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-101":{"Key-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-110":{"Key-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-111":{"Key-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-00":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-01":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-10":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-11":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},
                       "edge_points":{"@oracles_interface":[],"Mod-prf":[],"Prg-000":[],"Prg-001":[],"Prg-010":[],"Prg-011":[],"Prg-100":[],"Prg-101":[],"Prg-110":[],"Prg-111":[]}}
        },

        "Hybrid_{01}":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Key-000","GET-000"],["Key-001","GET-001"],["Prg-010","GET-010"],["Prg-011","GET-011"],["Prg-100","GET-100"],["Prg-101","GET-101"],["Prg-110","GET-110"],["Prg-111","GET-111"]],
                "Key-000": [[]],
                "Key-001": [[]],
                "Prg-010": [["Key-01", "GET-01"]],
                "Prg-011": [["Key-01", "GET-01"]],
                "Prg-100": [["Key-10", "GET-10"]],
                "Prg-101": [["Key-10", "GET-10"]],
                "Prg-110": [["Key-11", "GET-11"]],
                "Prg-111": [["Key-11", "GET-11"]],
                "Key-01": [[]],
                "Key-10": [[]],
                "Key-11": [[]],
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},"Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Key-000":{"x":150, "color":"blue","y":0,"width":90,"height":50, "color":"blue"},"Key-001":{"x":150, "color":"blue","y":60,"width":90,"height":50, "color":"blue"},"Prg-010":{"x":150, "color":"yellow","y":120,"width":90,"height":50, "color":"yellow"},"Prg-011":{"x":150, "color":"yellow","y":180,"width":90,"height":50, "color":"yellow"},"Prg-100":{"x":150, "color":"yellow","y":240,"width":90,"height":50, "color":"yellow"},"Prg-101":{"x":150, "color":"yellow","y":300,"width":90,"height":50, "color":"yellow"},"Prg-110":{"x":150, "color":"yellow","y":360,"width":90,"height":50, "color":"yellow"},"Prg-111":{"x":150, "color":"yellow","y":420,"width":90,"height":50, "color":"yellow"},"Key-00":{"x":310,"y":30,"width":90,"height":50, "color":"blue"},"Key-01":{"x":310,"y":150, "color":"blue","width":90,"height":50},"Key-10":{"x":310,"y":270,"width":90,"height":50, "color":"blue"},"Key-11":{"x":310,"y":390,"width":90,"height":50, "color":"blue"}},
                       "edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Key-000":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-001":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-010":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-011":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-100":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-101":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-110":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-111":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-000":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-001":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-010":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-011":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-100":{"Key-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-101":{"Key-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-110":{"Key-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-111":{"Key-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-00":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-01":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-10":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-11":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},
                       "edge_points":{"@oracles_interface":[],"Mod-prf":[],"Key-000":[],"Key-001":[],"Prg-010":[],"Prg-011":[],"Prg-100":[],"Prg-101":[],"Prg-110":[],"Prg-111":[]}}
        },

        "Hybrid_{10}":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Key-000","GET-000"],["Key-001","GET-001"],["Key-010","GET-010"],["Key-011","GET-011"],["Prg-100","GET-100"],["Prg-101","GET-101"],["Prg-110","GET-110"],["Prg-111","GET-111"]],
                "Key-000": [[]],
                "Key-001": [[]],
                "Key-010": [[]],
                "Key-011": [[]],
                "Prg-100": [["Key-10", "GET-10"]],
                "Prg-101": [["Key-10", "GET-10"]],
                "Prg-110": [["Key-11", "GET-11"]],
                "Prg-111": [["Key-11", "GET-11"]],
                "Key-10": [[]],
                "Key-11": [[]],
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},"Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Key-000":{"x":150, "color":"blue","y":0,"width":90,"height":50, "color":"blue"},"Key-001":{"x":150, "color":"blue","y":60,"width":90,"height":50, "color":"blue"},"Key-010":{"x":150, "color":"blue","y":120,"width":90,"height":50, "color":"blue"},"Key-011":{"x":150, "color":"blue","y":180,"width":90,"height":50, "color":"blue"},"Prg-100":{"x":150, "color":"yellow","y":240,"width":90,"height":50, "color":"yellow"},"Prg-101":{"x":150, "color":"yellow","y":300,"width":90,"height":50, "color":"yellow"},"Prg-110":{"x":150, "color":"yellow","y":360,"width":90,"height":50, "color":"yellow"},"Prg-111":{"x":150, "color":"yellow","y":420,"width":90,"height":50, "color":"yellow"},"Key-00":{"x":310,"y":30,"width":90,"height":50, "color":"blue"},"Key-01":{"x":310,"y":150, "color":"blue","width":90,"height":50},"Key-10":{"x":310,"y":270,"width":90,"height":50, "color":"blue"},"Key-11":{"x":310,"y":390,"width":90,"height":50, "color":"blue"}},
                       "edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Key-000":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-001":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-010":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-011":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-100":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-101":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-110":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-111":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-000":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-001":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-010":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-011":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-100":{"Key-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-101":{"Key-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-110":{"Key-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-111":{"Key-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-00":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-01":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-10":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-11":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},
                       "edge_points":{"@oracles_interface":[],"Mod-prf":[],"Key-000":[],"Key-001":[],"Key-010":[],"Key-011":[],"Prg-100":[],"Prg-101":[],"Prg-110":[],"Prg-111":[]}}
        },

        "Hybrid_{11}":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Key-000","GET-000"],["Key-001","GET-001"],["Key-010","GET-010"],["Key-011","GET-011"],["Key-100","GET-100"],["Key-101","GET-101"],["Prg-110","GET-110"],["Prg-111","GET-111"]],
                "Key-000": [[]],
                "Key-001": [[]],
                "Key-010": [[]],
                "Key-011": [[]],
                "Key-100": [[]],
                "Key-101": [[]],
                "Prg-110": [["Key-11", "GET-11"]],
                "Prg-111": [["Key-11", "GET-11"]],
                "Key-11": [[]],
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},"Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Key-000":{"x":150, "color":"blue","y":0,"width":90,"height":50, "color":"blue"},"Key-001":{"x":150, "color":"blue","y":60,"width":90,"height":50, "color":"blue"},"Key-010":{"x":150, "color":"blue","y":120,"width":90,"height":50, "color":"blue"},"Key-011":{"x":150, "color":"blue","y":180,"width":90,"height":50, "color":"blue"},"Key-100":{"x":150, "color":"blue","y":240,"width":90,"height":50, "color":"blue"},"Key-101":{"x":150, "color":"blue","y":300,"width":90,"height":50, "color":"blue"},"Prg-110":{"x":150, "color":"yellow","y":360,"width":90,"height":50, "color":"yellow"},"Prg-111":{"x":150, "color":"yellow","y":420,"width":90,"height":50, "color":"yellow"},"Key-00":{"x":310,"y":30,"width":90,"height":50, "color":"blue"},"Key-01":{"x":310,"y":150, "color":"blue","width":90,"height":50},"Key-10":{"x":310,"y":270,"width":90,"height":50, "color":"blue"},"Key-11":{"x":310,"y":390,"width":90,"height":50, "color":"blue"}},
                       "edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Key-000":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-001":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-010":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-011":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-100":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-101":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-110":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-111":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-000":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-001":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-010":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-011":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-100":{"Key-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-101":{"Key-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-110":{"Key-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Prg-111":{"Key-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-00":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-01":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-10":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-11":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},
                       "edge_points":{"@oracles_interface":[],"Mod-prf":[],"Key-000":[],"Key-001":[],"Key-010":[],"Key-011":[],"Key-100":[],"Key-101":[],"Prg-110":[],"Prg-111":[]}}
        },


        "Hybrid_{000}":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Key-000","GET-000"],["Key-001","GET-001"],["Key-010","GET-010"],["Key-011","GET-011"],["Key-100","GET-100"],["Key-101","GET-101"],["Key-110","GET-110"],["Key-111","GET-111"]],
                "Key-000": [[]],
                "Key-001": [[]],
                "Key-010": [[]],
                "Key-011": [[]],
                "Key-100": [[]],
                "Key-101": [[]],
                "Key-110": [[]],
                "Key-111": [[]],
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},"Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Key-000":{"x":150, "color":"blue","y":0,"width":90,"height":50, "color":"blue"},"Key-001":{"x":150, "color":"blue","y":60,"width":90,"height":50, "color":"blue"},"Key-010":{"x":150, "color":"blue","y":120,"width":90,"height":50, "color":"blue"},"Key-011":{"x":150, "color":"blue","y":180,"width":90,"height":50, "color":"blue"},"Key-100":{"x":150, "color":"blue","y":240,"width":90,"height":50, "color":"blue"},"Key-101":{"x":150, "color":"blue","y":300,"width":90,"height":50, "color":"blue"},"Key-110":{"x":150, "color":"blue","y":360,"width":90,"height":50, "color":"blue"},"Key-111":{"x":150, "color":"blue","y":420,"width":90,"height":50, "color":"blue"},"Key-00":{"x":310,"y":30,"width":90,"height":50, "color":"blue"},"Key-01":{"x":310,"y":150, "color":"blue","width":90,"height":50},"Key-10":{"x":310,"y":270,"width":90,"height":50, "color":"blue"},"Key-11":{"x":310,"y":390,"width":90,"height":50, "color":"blue"}},
                       "edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Key-000":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-001":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-010":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-011":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-100":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-101":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-110":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Key-111":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-000":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-001":{"Key-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-010":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-011":{"Key-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-100":{"Key-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-101":{"Key-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-110":{"Key-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-111":{"Key-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-00":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-01":{"Key-0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-10":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Key-11":{"Key-1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},
                       "edge_points":{"@oracles_interface":[],"Mod-prf":[],"Key-000":[],"Key-001":[],"Key-010":[],"Key-011":[],"Key-100":[],"Key-101":[],"Key-110":[],"Key-111":[]}}
        },


        "Gprf(PRF_{GGM})-hyb1":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Gprg-000","GET"],["Gprg-001","GET"],["Gprg-010","GET"],["Gprg-011","GET"],["Gprg-100","GET"],["Gprg-101","GET"],["Gprg-110","GET"],["Gprg-111","GET"]],
                "Gprg-000": [["Gprg-00","GET"]],
                "Gprg-001": [["Gprg-00", "GET"]],
                "Gprg-010": [["Gprg-01", "GET"]],
                "Gprg-011": [["Gprg-01", "GET"]],
                "Gprg-100": [["Gprg-10", "GET"]],
                "Gprg-101": [["Gprg-10", "GET"]],
                "Gprg-110": [["Gprg-11", "GET"]],
                "Gprg-111": [["Gprg-11", "GET"]],
                "Gprg-00": [["Gprg-0^1", "GET"]],
                "Gprg-01": [["Gprg-0^1", "GET"]],
                "Gprg-10": [["Gprg-1^1", "GET"]],
                "Gprg-11": [["Gprg-1^1", "GET"]],
                "Gprg-0^1": [],
                "Gprg-1^1": [],
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},"Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Gprg-000":{"x":150, "color":"yellow","y":0,"width":90,"height":50, "color":"yellow"},"Gprg-001":{"x":150, "color":"yellow","y":60,"width":90,"height":50, "color":"yellow"},"Gprg-010":{"x":150, "color":"yellow","y":120,"width":90,"height":50, "color":"yellow"},"Gprg-011":{"x":150, "color":"yellow","y":180,"width":90,"height":50, "color":"yellow"},"Gprg-100":{"x":150, "color":"yellow","y":240,"width":90,"height":50, "color":"yellow"},"Gprg-101":{"x":150, "color":"yellow","y":300,"width":90,"height":50, "color":"yellow"},"Gprg-110":{"x":150, "color":"yellow","y":360,"width":90,"height":50, "color":"yellow"},"Gprg-111":{"x":150, "color":"yellow","y":420,"width":90,"height":50, "color":"yellow"},"Gprg-00":{"x":310,"y":30,"width":90,"height":50, "color":"yellow"},"Gprg-01":{"x":310,"y":150, "color":"yellow","width":90,"height":50, "color":"yellow"},"Gprg-10":{"x":310,"y":270,"width":90,"height":50, "color":"yellow"},"Gprg-11":{"x":310,"y":390,"width":90,"height":50, "color":"yellow"},"Gprg-0^1":{"x":440,"y":90,"width":90,"height":50, "color":"blue"},"Gprg-1^1":{"x":440,"y":330,"width":90,"height":50, "color":"blue"}},"edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Gprg-000":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Gprg-001":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Gprg-010":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Gprg-011":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Gprg-100":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Gprg-101":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Gprg-110":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Gprg-111":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-000":{"Gprg-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-001":{"Gprg-00":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-010":{"Gprg-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-011":{"Gprg-01":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-100":{"Gprg-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-101":{"Gprg-10":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-110":{"Gprg-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-111":{"Gprg-11":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-00":{"Gprg-0^1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-01":{"Gprg-0^1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-10":{"Gprg-1^1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Gprg-11":{"Gprg-1^1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[],"Mod-prf":[],"Gprg-000":[],"Gprg-001":[],"Gprg-010":[],"Gprg-011":[],"Gprg-100":[],"Gprg-101":[],"Gprg-110":[],"Gprg-111":[],"Gprg-00":[],"Gprg-01":[],"Gprg-10":[],"Gprg-11":[],"Gprg-0^1":[],"Gprg-1^1":[]}}

        },

        "GGM-const^1":
        {
            "oracles": [["Mod-prf", "EVAL"]],

            "graph":
            {
                "Mod-prf": [["Prg-id1_1", "GET"], ["Prg-id1_2", "GET"], ["Prg-id1_3", "GET"], ["Prg-id1_4", "GET"], ["Prg-id1_5", "GET"], ["Prg-id1_6", "GET"], ["Prg-id1_7", "GET"], ["Prg-id1_8", "GET"]],
                "Prg-id1_1": [],
                "Prg-id1_2": [],
                "Prg-id1_3": [],
                "Prg-id1_4": [],
                "Prg-id1_5": [],
                "Prg-id1_6": [],
                "Prg-id1_7": [],
                "Prg-id1_8": []
            },

            "layout": {"nodes":{"@oracles_interface":{"x":0,"y":210,"width":1,"height":50},"Mod-prf":{"x":50,"y":170,"width":50,"height":130},"Prg-id1_1":{"x":150, "color":"blue","y":0,"width":90,"height":50, "color":"blue"},"Prg-id1_2":{"x":150, "color":"blue","y":60,"width":90,"height":50, "color":"blue"},"Prg-id1_3":{"x":150, "color":"blue","y":120,"width":90,"height":50, "color":"blue"},"Prg-id1_4":{"x":150, "color":"blue","y":180,"width":90,"height":50, "color":"blue"},"Prg-id1_5":{"x":150, "color":"blue","y":240,"width":90,"height":50, "color":"blue"},"Prg-id1_6":{"x":150, "color":"blue","y":300,"width":90,"height":50, "color":"blue"},"Prg-id1_7":{"x":150, "color":"blue","y":360,"width":90,"height":50, "color":"blue"},"Prg-id1_8":{"x":150, "color":"blue","y":420,"width":90,"height":50, "color":"blue"}},"edges":{"@oracles_interface":{"Mod-prf":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"Mod-prf":{"Prg-id1_1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-id1_2":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-id1_3":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-id1_4":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-id1_5":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-id1_6":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-id1_7":"exitX=1;exitY=0(.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","Prg-id1_8":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[],"Mod-prf":[]}}

        }

    };

    var game_defs = {
        "PRG-assumption": [["GPrg-id0", "Prg-id1"]]
    };

    var prooftree = {
        "Definition (PRF)" :
        {
            parent : null,
            contents: [
                {
                    text: "We write the PRF security game in a manner which aides the SSP based prove: Instead of supplying a package for the PRF experiment which just calls its PRF \\(f\\) internally we opt to describe the construction in terms of SSP packages -- and use a \\(\\mathrm{Key}\\) package to take care of the <em>state</em> of the experiment."
                },
                {
                    text: "The \\(\\mathrm{Gprf}_\\mathsf{cons}\\) package in the definition can of course be realised by a composition of multiple packages which can formally be integrated into one package by <em>inlining</em>"
                },
                {
                    graphs: [["\\mathrm{Gprf}^0", "\\mathrm{Gprf}^1"]]
                },
                {
                    text: "The PRF advantage for a construction \\(\\mathrm{Gprf}_\\mathsf{cons}\\) is defined as $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Gprf}_{\\mathsf{cons}}\\rightarrow\\mathrm{Key},\\mathrm{RO})$$ We say a PRF is secure if for any PPT adversary \\(\\mathcal{A}\\) the advantage is neglegible."
                }
            ]
        },
        "Definition (PRG)" :
        {
            parent : null,
            contents: [
                {
                    text: "In contrast, the PRG experiment is formulated in a more traditional manner where the \\(\\mathrm{Prg\\text{-}id}\\) packages call a candidate PRG \\(g\\). Giving the adversary separate access to the output halves aides the further proof without changing the notion of security. One could proof equivalence between such constructions if desired."
                },
                {
                    graphs: [["GPrg^0_\\text{id}", "GPrg^1_\\text{id}"]]
                },
                {
                    text: "The PRG advantage for a function \\(g\\) is defined as: $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Gprg}^0_\\text{id},\\mathrm{Gprg}^1_\\text{id})$$ We say a PRG is secure if for any PPT adversary \\(\\mathcal{A}\\) the advantage is neglegible."
                }
            ]
        },
        "Construction" :
        {
            "parent": null,
            "contents": [
                {
                    "text": "Recall that we defined PRF security relative to a construction package. Thus we have to provide a composition which satisfies the interfaces of \\(\\mathrm{Gprf}_\\mathsf{cons}\\) reproduced here for convenience."
                },
                {
                    "graphs": [["Modular-Gprf", "Modular-Gprf-cons"]]
                },
                {
                    "text": "We define the stateless \\(\\mathrm{Prf}_{GGM}\\)  composition as follows. <!--<br>(The leaf \\(\\mathsf{Prg}\\) packages make \\(\\mathsf{GET}\\) calls too, but due to a current limitation of the proof viewer it is not rendered).-->"
                },
                {
                    "graphs": [["PRF_{GGM}"]]
                },
                {
                    "text": "One can verify that this composition satisfies the interfaces of \\(\\mathrm{Gprf}_\\mathsf{cons}\\), in particular it exposes an \\(\\mathsf{EVAL}\\) oracle (at \\(\\mathrm{Mod\\text{-}prf}\\)) and only calls a \\(\\mathsf{GET}\\) oracle (where both \\(\\mathrm{Prg\\text{-}0}\\) and \\(\\mathrm{Prg\\text{-}1}\\) call the <em>same</em> \\(\\mathsf{GET}\\) oracle)."
                },
            ]
        },

        "Theorem" :
        {
            "parent": "Construction",
            "contents": [
                {
                    "text": "There exist PPT reductions \\(\\mathrm{R}_{[]}\\), \\(\\mathrm{R}_0\\), \\(\\mathrm{R}_1\\), \\(\\mathrm{R}_{00}\\), \\(\\mathrm{R}_{01}\\), \\(\\mathrm{R}_{10}\\), and \\(\\mathrm{R}_{11}\\), such that for all PPT adversaries  \\(\\mathcal{A}\\), we have that $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Prf}_{\\mathsf{GGM}}\\rightarrow\\mathrm{Key},\\mathrm{RO})\\leq \\sum_{\\text{id}\\in\\{[],0,1,00,01,10,11\\}}\\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{\\text{id}},\\mathrm{GPrg}_{\\text{id}}^0,\\mathrm{GPrg}_{\\text{id}}^1)$$."
                },
                {
                    "text": "<p class=\"proofstep-title\">Proof of Theorem</p><p> The proof proceeds via a hybrid argument. We now first define the hybrid games and then state claims which construct a reduction between each subsequent pair of games. The PPT reductions \\(\\mathrm{R}_{[]}\\), \\(\\mathrm{R}_0\\), \\(\\mathrm{R}_1\\), \\(\\mathrm{R}_{00}\\), \\(\\mathrm{R}_{01}\\), \\(\\mathrm{R}_{10}\\), and \\(\\mathrm{R}_{11}\\) will be defined in Claim [], Claim 0, Claim 1, Claim 00, Claim 01, Claim 10, and Claim 11, respectively. In addition, the claims establish that for all PPT adversaries \\(\\mathcal{A}\\), it holds that $$ \\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid}_{[]},\\mathrm{Hybrid}_{0})\\leq \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{[]},\\mathrm{Gprg}_{[]}^0,\\mathrm{Gprg}_{[]}^1)$$  $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid}_{0},\\mathrm{Hybrid}_{1})\\leq \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{0},\\mathrm{Gprg}_{0}^0,\\mathrm{Gprg}_{0}^1)$$ $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid}_{1},\\mathrm{Hybrid}_{00})\\leq \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{1},\\mathrm{Gprg}_{1}^0,\\mathrm{Gprg}_{1}^1)$$ $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid}_{00},\\mathrm{Hybrid}_{01})\\leq \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{00},\\mathrm{Gprg}_{00}^0,\\mathrm{Gprg}_{00}^1)$$                 $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid}_{01},\\mathrm{Hybrid}_{10})\\leq \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{01},\\mathrm{Gprg}_{01}^0,\\mathrm{Gprg}_{01}^1)$$ $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid}_{10},\\mathrm{Hybrid}_{11})\\leq \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{10},\\mathrm{Gprg}_{10}^0,\\mathrm{Gprg}_{10}^1)$$ $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid}_{11},\\mathrm{Hybrid}_{000})\\leq \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{11},\\mathrm{Gprg}_{11}^0,\\mathrm{Gprg}_{11}^1)$$ By the triangle inequality, we obtain that $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid}_{[]},\\mathrm{Hybrid}_{000})\\leq \\sum_{\\text{id}\\in\\{[],0,1,00,01,10,11\\}}\\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{\\text{id}},\\mathrm{GPrg}_{\\text{id}}^0,\\mathrm{GPrg}_{\\text{id}}^1)     (1).$$ Claim 2 then establishes that $$\\mathrm{RO}\\stackrel{\\text{code}}{\\equiv}\\mathrm{Hybrid}_{000}.$$ Using Inequality (1), we then obtain that $$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Prf}_{\\mathrm{GGM}}\\rightarrow\\mathrm{Key},\\mathrm{RO})$$ $$\\leq\\mathsf{Adv}(\\mathcal{A},\\mathrm{Prf}_{\\mathrm{GGM}}\\rightarrow\\mathrm{Key},\\mathrm{Hybrid}_{000})$$ $$\\leq\\sum_{\\text{id}\\in\\{[],0,1,00,01,10,11\\}}\\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{\\text{id}},\\mathrm{GPrg}_{\\text{id}}^0,\\mathrm{GPrg}_{\\text{id}}^1),$$ as required by the Theorem. We now state and prove each of the claims in turn.</p>"
                }
            ]
        },

        "Claim[]":
        {
            "parent": "Theorem",
            "contents": [
                {
                    "text":`Let \\(\\mathrm{R}_{[]}\\) be the reduction defined by the packages hatched in red in the graphs below and \\(\\mathcal{A}\\) be a PPT adversary, then
$$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Prf_{GGM}}\\rightarrow\\mathrm{Key},\\mathrm{Hybrid_{0}}) = \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{[]},\\mathrm{Gprg}_{[]}^0,\\mathrm{Gprg}_{[]}^1)$$.`
                },
                {
                    "graphs": [["Gprf(PRF_{GGM})"],["Hybrid_{0}"]]
                },
            ],
            "type":
            {
                "reduction":
                [
                    {
                        "i": 0, "j": 0,
                        "cut": ["Mod-prf", "Prg-000", "Prg-001", "Prg-010", "Prg-011", "Prg-100", "Prg-101", "Prg-110", "Prg-111", "Prg-10", "Prg-11", "Prg-00", "Prg-01"]
                    },
                    {
                        "i": 1, "j": 0,
                        "cut": ["Mod-prf", "Prg-000", "Prg-001", "Prg-010", "Prg-011", "Prg-100", "Prg-101", "Prg-110", "Prg-111", "Prg-10", "Prg-11", "Prg-00", "Prg-01"]
                    },

                ]
            }
        },

        "Claim0":
        {
            "parent": "Theorem",
            "contents": [
                {
                    "text":`Let \\(\\mathrm{R}_{0}\\) be the reduction defined by the packages hatched in red in the graphs below and \\(\\mathcal{A}\\) be a PPT adversary, then
$$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid_{0}},\\mathrm{Hybrid_{1}}) = \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_0,\\mathrm{Gprg}_{0}^0,\\mathrm{Gprg}_{0}^1)$$.`
                },
                {
                    "graphs": [["Hybrid_{0}"],["Hybrid_{1}"]]
                },
            ],
            "type":
            {
                "reduction":
                [
                    {
                        "i": 0, "j": 0,
                        "cut": ["Mod-prf", "Prg-000", "Prg-001", "Prg-010", "Prg-011", "Prg-100", "Prg-101", "Prg-110", "Prg-111", "Prg-10", "Prg-11", "Key-1"]
                    },
                    {
                        "i": 1, "j": 0,
                        "cut": ["Mod-prf", "Prg-000", "Prg-001", "Prg-010", "Prg-011", "Prg-100", "Prg-101", "Prg-110", "Prg-111", "Prg-10", "Prg-11", "Key-1"]
                    }

                ]
            }
        },

        "Claim1":
        {
            "parent": "Theorem",
            "contents": [
                {
                    "text":`Let \\(\\mathrm{R}_{1}\\) be the reduction defined by the packages hatched in red in the graphs below and \\(\\mathcal{A}\\) be a PPT adversary, then
$$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid_{1}},\\mathrm{Hybrid_{00}}) = \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_1,\\mathrm{Gprg}_{1}^0,\\mathrm{Gprg}_{1}^1)$$.`
                },
                {
                    "graphs": [["Hybrid_{1}"],["Hybrid_{00}"]]
                },
            ],
            "type":
            {
                "reduction":
                [
                    {
                        "i": 0, "j": 0,
                        "cut": ["Mod-prf", "Prg-000", "Prg-001", "Prg-010", "Prg-011", "Prg-100", "Prg-101", "Prg-110", "Prg-111", "Key-00", "Key-01"]
                    },
                    {
                        "i": 1, "j": 0,
                        "cut": ["Mod-prf", "Prg-000", "Prg-001", "Prg-010", "Prg-011", "Prg-100", "Prg-101", "Prg-110", "Prg-111", "Key-00", "Key-01"]
                    }

                ]
            }
        },

        "Claim00":
        {
            "parent": "Theorem",
            "contents": [
                {
                    "text":`Let \\(\\mathrm{R}_{00}\\) be the reduction defined by the packages hatched in red in the graphs below and \\(\\mathcal{A}\\) be a PPT adversary, then
$$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid_{00}},\\mathrm{Hybrid_{01}}) = \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{00},\\mathrm{Gprg}_{00}^0,\\mathrm{Gprg}_{00}^1)$$.`
                },
                {
                    "graphs": [["Hybrid_{00}"],["Hybrid_{01}"]]
                },
            ],
            "type":
            {
                "reduction":
                [
                    {
                        "i": 0, "j": 0,
                        "cut": ["Mod-prf", "Prg-010", "Prg-011", "Prg-100", "Prg-101", "Prg-110", "Prg-111", "Key-01", "Key-10", "Key-11"]
                    },
                    {
                        "i": 1, "j": 0,
                        "cut": ["Mod-prf", "Prg-010", "Prg-011", "Prg-100", "Prg-101", "Prg-110", "Prg-111", "Key-01", "Key-10", "Key-11"]
                    }

                ]
            }
        },

        "Claim01":
        {
            "parent": "Theorem",
            "contents": [
                {
                    "text":`Let \\(\\mathrm{R}_{01}\\) be the reduction defined by the packages hatched in red in the graphs below and \\(\\mathcal{A}\\) be a PPT adversary, then
$$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid_{01}},\\mathrm{Hybrid_{10}}) = \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{01},\\mathrm{Gprg}_{01}^0,\\mathrm{Gprg}_{01}^1)$$.`
                },
                {
                    "graphs": [["Hybrid_{01}"],["Hybrid_{10}"]]
                },
            ],
            "type":
            {
                "reduction":
                [
                    {
                        "i": 0, "j": 0,
                        "cut": ["Mod-prf", "Key-000", "Key-001", "Prg-100", "Prg-101", "Prg-110", "Prg-111", "Key-10", "Key-11"]
                    },
                    {
                        "i": 1, "j": 0,
                        "cut": ["Mod-prf", "Key-000", "Key-001", "Prg-100", "Prg-101", "Prg-110", "Prg-111", "Key-10", "Key-11"]
                    }

                ]
            }
        },

        "Claim10":
        {
            "parent": "Theorem",
            "contents": [
                {
                    "text":`Let \\(\\mathrm{R}_{10}\\) be the reduction defined by the packages hatched in red in the graphs below and \\(\\mathcal{A}\\) be a PPT adversary, then
$$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid_{10}},\\mathrm{Hybrid_{11}}) = \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{10},\\mathrm{Gprg}_{10}^0,\\mathrm{Gprg}_{10}^1)$$.`
                },
                {
                    "graphs": [["Hybrid_{10}"],["Hybrid_{11}"]]
                },
            ],
            "type":
            {
                "reduction":
                [
                    {
                        "i": 0, "j": 0,
                        "cut": ["Mod-prf", "Key-000", "Key-001", "Key-010", "Key-011", "Prg-110", "Prg-111", "Key-01", "Key-11"]
                    },
                    {
                        "i": 1, "j": 0,
                        "cut": ["Mod-prf", "Key-000", "Key-001", "Key-010", "Key-011", "Prg-110", "Prg-111", "Key-01", "Key-11"]
                    }

                ]
            }
        },

        "Claim11":
        {
            "parent": "Theorem",
            "contents": [
                {
                    "text":`Let \\(\\mathrm{R}_{11}\\) be the reduction defined by the packages hatched in red in the graphs below and \\(\\mathcal{A}\\) be a PPT adversary, then
$$\\mathsf{Adv}(\\mathcal{A},\\mathrm{Hybrid_{11}},\\mathrm{Hybrid_{000}}) = \\mathsf{Adv}(\\mathcal{A}\\rightarrow\\mathrm{R}_{11},\\mathrm{Gprg}_{11}^0,\\mathrm{Gprg}_{11}^1)$$.`
                },
                {
                    "graphs": [["Hybrid_{11}"],["Hybrid_{000}"]]
                },
            ],
            "type":
            {
                "reduction":
                [
                    {
                        "i": 0, "j": 0,
                        "cut": ["Mod-prf", "Key-000", "Key-001", "Key-010", "Key-011", "Key-100", "Key-101"]
                    },
                    {
                        "i": 1, "j": 0,
                        "cut": ["Mod-prf", "Key-000", "Key-001", "Key-010", "Key-011", "Key-100", "Key-101"]
                    }

                ]
            }
        },

        "Claim2":
        {
            "parent": "Theorem",
            "contents": [
                {
                    "text": "$$\\mathrm{RO}\\stackrel{\\text{code}}{\\equiv}\\mathrm{Hybrid}_{000}.$$. <p class=\"proofstep-title\">Proof of Claim 2</p><p> We show via inlining that the following two graphs are code-equivalent."
                },
                {
                    "graphs": [["RO", "Hybrid_{000}"]]
                }
            ],

            "type":
            {
                "codeq": {
                    "columns": [
                        {
                            "packages":
                            {
                                "Hybrid_{000}":
                                {
                                    "oracles":
                                    {
                                        "EVAL":
                                        {
                                            "code": "@assert |x| = 3; x_1||...||x_3 @gets x; y @gets \\mathsf{Gprg}\\text{-}x_{1}x_{2}x_{3}.\\mathsf{GET}(); ;; @return y;",
                                            "params": ["x"]
                                        }

                                    }
                                }
                            }
                        },

                        {
                            "packages":
                            {
                                "Hybrid_{000}'":
                                {
                                    "oracles":
                                    {
                                        "EVAL":
                                        {
                                            "code": "@assert |x| = 3; x_1||...||x_3 @gets x; @if k_{x_1||x_2||x_3} = @bot; @> k_{x_1||x_2||x_3} @sample  \\{0,1\\}^\\lambda; y @gets k_{x_1||x_2||x_3}; @return y;",
                                            "params": ["x"]
                                        }

                                    }
                                }
                            }
                        },

                        {
                            "packages":
                            {
                                "RO'":
                                {
                                    "oracles":
                                    {
                                        "EVAL":
                                        {
                                            "code": "@assert |x| = 3; x_1||...||x_3 @gets x; @if T[x_1||x_2||x_3] = @bot; @> T[x_1||x_2||x_3] @sample  \\{0,1\\}^\\lambda; y @gets T[x_1||x_2||x_3]; @return y;",
                                            "params": ["x"]
                                        }

                                    }
                                }
                            }
                        },

                        {
                            "packages":
                            {
                                "RO":
                                {
                                    "oracles":
                                    {
                                        "EVAL":
                                        {
                                            "code": "@assert |x| = 3;;@if T[x] = @bot; @> T[x] @sample  \\{0,1\\}^\\lambda;;@return T[x]",
                                            "params": ["x"]
                                        }

                                    }
                                }
                            }
                        }
                    ]
                },

                "cuts": [
                    {
                        "i": 0, "j": 1,
                        "cut": ["Mod-prf", "Key-000", "Key-001", "Key-010", "Key-011", "Key-100", "Key-101", "Key-110", "Key-111"]
                    }
                ]
            }

        }
    };

    var proof = {
        "name": proof_name,
        "prooftree": prooftree,
        "game_defs": game_defs,
        "monolithic_pkgs": monolithic_pkgs,
        "modular_pkgs": modular_pkgs
    }

    var wnd_width = 600;
    var wnd_height = 300;
    var wnd_x = (window.innerWidth - wnd_width) - wnd_width/9;
    var wnd_y = window.innerHeight - wnd_height;

    var wnd_pos = {wnd_height: 300, width: wnd_width, x: wnd_x, y: wnd_y}
    var wrapper_width = {proof_width: '65%', oracle_width: '30%'}
    add_proof(proof, wnd_pos, wrapper_width);


}

ggm_driver();
