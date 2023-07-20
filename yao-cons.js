function newyao_driver() {
    var def_name = "Yao's Garbling Construction";

    var monolithic_pkgs = {
	"MOD-PRIVSIM^b_{n,d}":
	{
	    "oracles":
	    {
		"GARBLE":
		{
		    "code": "@assert \\tilde{C} = \\bot;@assert \\mathsf{width}(C) = n;@assert \\mathsf{depth}(C) = d;@for j = 1..n @do;@> \\mathsf{SETBIT}_j(x_j);@if b = 1 @then \\mathsf{EVAL(C)};\\tilde{C} @gets \\mathsf{GBL}(C);\\text{dinf} @gets \\mathsf{GETDINF};@for j = 1..n @do;@> \\tilde{x}[j] @gets \\mathsf{GETA}^{out}_j;@return tilde{C}, \\tilde{x}, \\text{dinf})",
		    "params": ["C", "x"]
		}
	    }
	},

	"MOD-PRIVSIM^0":
	{
	    "instance": "MOD-PRIVSIM^b_{n,d}"
	},

	"MOD-PRIVSIM^1":
	{
	    "instance": "MOD-PRIVSIM^b_{n,d}"
	},

	"EV_{n,d}":
	{
	    "oracles":
	    {
		"EVAL" :
		{
		    "code": "@assert \\tilde{C} = \\bot;@assert \\mathsf{width}(C) = n;@assert \\mathsf{depth}(C) = d;@for j = 1..n @do;@> \\mathsf{GETBIT}_j;@for i = 1..d @do;@> (\\boldsymbol{\\ell},\\boldsymbol{r},\\boldsymbol{op}) @gets C[i];      @for j = 1..n @do;@> @> ell, r, op) @gets (\\boldsymbol{\\ell}(j),\\boldsymbol{r}(j),\\boldsymbol{op}(j)); @> @> z_{i,j} @gets op(z_{i-1,\\ell},z_{i-1,r});@for j = 1..d @do;@> \\mathsf{SETBIT}_j(z_{d,j});@return ()",
		    "params": ["j", "\\ell", "r", "op"]
		}

	    }

	},

	"EV":
	{
	    "instance": "EV_{n,d}"
	},

	"BITS":
	{
	    "oracles":
	    {
		"SETBIT_j":
		{
		    "code": "@assert z_j = \\bot;z_j @gets z;@return ()",
		    "params": ["z"]
		},

		"GETBIT":
		{
		    "code": "@assert z_j \\neq \\bot;@return z_j",
		    "params": []
		}
	    }
	},

	"BITS_{1..n}^{top}":
	{
	    "instance": "BITS"
	},

	"BITS_{1..n}^{bottom}":
	{
	    "instance": "BITS"
	},

	"EKEYS_j":
	{
	    "oracles":
	    {
		"SETKEYS_j":
		{
		    "code": "@assert Z_j = \\bot;Z_j @gets Z;@return ()",
		    "params": ["Z"]
		},

		"GETKEYS_j":
		{
		    "code": "@assert Z_j \\neq \\bot;@return Z_j",
		    "params": []
		}
	    }

	},

	"EKEYS_{1,...,n}":
	{
	    "instance": "EKEYS_j"
	},


	"EN_j":
	{
	    "oracles":
	    {
		"SETBIT_j":
		{
		    "code": "@assert z_j = \\bot;z_j @gets z;@return ()",
		    "params": ["z"]
		},

		"GETA":
		{
		    "code": "@assert z_j \\neq \\bot;Z @gets \\mathsf{GETKEYS}^{in}_j;@return Z(z_j)",
		    "params": []
		}
	    }

	},

	"EN_{1,..,n}":
	{
	    "instance": "EN_j"
	},

	"GB_{tdyao,n,d}":
	{
	    "oracles":
	    {
		"GBL":
		{
		    "code": "@for i = 0..d @do;@> @for j = 1..n @do;@> @> Z_{i,j}(0) @sample \\{0,1\\}^{\\lambda};@> @> Z_{i,j}(1) @sample \\{0,1\\}^{\\lambda};@for i = 1..d @do;@> (\\boldsymbol{\\ell},\\boldsymbol{r},\\boldsymbol{op}) @gets C[i];      @for j = 1..n @do;@> @> ell, r, op) @gets (\\boldsymbol{\\ell}(j),\\boldsymbol{r}(j),\\boldsymbol{op}(j));@> @> \\tilde{g}_j @gets \\bot;@> @> @for (b_{\\ell},b_r) \\in \\{0,1\\}^2;@> @> @> b_j @gets op(b_{\\ell}, b_r);@> @> @> k_j @gets Z_{i,j}(b_j);@> @> @> c_{in} @sample enc(Z_{i,\\ell}(b_{\\ell}, k_j));@> @> @> c @sample enc(Z_{i,r}(b_r), c_{in});@> @> @> \\tilde{g}_j @gets \\tilde{g}_j \\cup c; @> @> \\tilde{C}[i,j] @gets \\tilde{g}_j;@for j = 1..n @do;@> \\mathsf{SETKEYS}_j(Z_{0,j});\\mathsf{SETDINF}(Z_{d,1}, \\cdots, Z_{d,n});@return \\tilde{C}",
		    "params": ["C"]
		}
	    }
	},

	"GB_{n,d}":
	{
	    "oracles":
	    {
		"GBL":
		{
		    "code": "##(defined by the garbling scheme)",
		    "params": ["C"]
		}
	    }
	},

	"SIM_{tdyao}":
	{
	    "oracles":
	    {
		"GBL":
		{
		    "code": "@for i = 0..d @do;@> @for j = 1..n @do;@> @> S_{i,j}(0) @sample \\{0,1\\}^{\\lambda};@> @> S_{i,j}(1) @sample \\{0,1\\}^{\\lambda};@for i = 1..d @do;@> (\\boldsymbol{\\ell},\\boldsymbol{r},\\boldsymbol{op}) @gets C[i];      @for j = 1..n @do;@> @> ell, r, op) @gets (\\boldsymbol{\\ell}(j),\\boldsymbol{r}(j),\\boldsymbol{op}(j));@> @> \\tilde{g}_j @gets \\bot;@> @> @for (d_{\\ell},d_r) \\in \\{0,1\\}^2;@> @> @> k_{i-1,\\ell} @gets S_{i-1,\\ell}(d_{\\ell});@> @> @> k_{i-1,r} @gets S_{i-1,r}(d_{r});@> @> @> @if d_{\\ell} = d_r = 0:;@> @> @> @> k_{i,j} @gets S_{i,j}(0);@> @> @> @else k_{i,j} @gets 0^{\\lambda};@> @> @> c_{in} @sample enc(k_{i-1,r}, k_{i,j}));@> @> @> c @sample enc(k_{i-1,\\ell}, c_{in});@> @> @> \\tilde{g}_j @gets \\tilde{g}_j \\cup c; @> @> \\tilde{C}_j @gets \\tilde{g}_j;\\tilde{C}[i] @gets \\tilde{C}_{1,..n};@return \\tilde{C}",
		    "params": ["C"]
		},

		"GETDINF":
		{
		    "code": "@for j = 1..n @do;@> z_{d,j} @gets \\mathsf{GETBIT}_j;@> Z_{d,j}(z_{d,j}) @gets S_{d,j}(0);@> Z_{d,j}(1-z_{d,j}) @gets S_{d,j}(1);@> \\text{dinf}[j] @gets Z_{d,j};@return \\text{dinf}",
		    "params": []
		},

		"GETA_j":
		{
		    "code": "@return S_{0,j}(0)",
		    "params": []
		}

	    }
	},

	"SIM":
	{
	    "instance": "SIM_{tdyao}"
	},

	"DINF_{tdyao,n,d}":
	{
	    "oracles":
	    {
		"SETDINF":
		{
		    "code": "\\text{dinf} @gets \\text{dinf};@return ()",
		    "params": ["\\text{dinf}"]
		},
		"GETDINF":
		{
		    "code": "@return \\text{dinf}",
		    "params": []
		}
	    }
	},

	"DINF":
	{
	    "oracles":
	    {
		"SETDINF":
		{
		    "code": "##(defined by the garbling scheme)",
		    "params": ["\\text{dinf}"]
		},
		"GETDINF":
		{
		    "code": "##(defined by the garbling scheme)",
		    "params": []
		}
	    }
	}


    };


    var modular_pkgs = {
	"Composition":
	{
	    "oracles": [["EN_{1,..,n}", "SETBIT"], ["GEV_{n,d}", "EVAL"]],
	    "graph":
	    {
		"GEV_{n,d}": [["GB_{n,d}", "GBL"], ["EN_{1,..,n}", "GETA^{out}_{1..n}"], ["DINF", "GETDINF"]],
		"EN_{1,..,n}": [["EKEYS_{1..n}", "GETKEYS"]],
		"GB_{n,d}": [["EKEYS_{1..n}", "SETKEYS_{1..n}"], ["DINF", "SETDINF"]],
		"EKEYS_{1..n}": [],
		"DINF": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":40,"height":170},"GEV_{n,d}":{"x":90,"y":40,"width":90,"height":100},"EN_{1,..,n}":{"x":280,"y":0,"width":90,"height":50},"GB_{n,d}":{"x":280,"y":60,"width":90,"height":50},"EKEYS_{1..n}":{"x":480,"y":20,"width":90,"height":50},"DINF":{"x":480,"y":90,"width":90,"height":50}},"edges":{"@oracles_interface":{"EN_{1,..,n}":"exitX=1;exitY=0.15;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","GEV_{n,d}":"exitX=1;exitY=0.525;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"GEV_{n,d}":{"GB_{n,d}":"exitX=1;exitY=0.45;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","EN_{1,..,n}":"exitX=1;exitY=0.05;entryX=0;entryY=0.85;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","DINF":"exitX=0.85;exitY=0.75;entryX=0.05;entryY=0.7;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"EN_{1,..,n}":{"EKEYS_{1..n}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.1;entryDx=0;entryDy=0;"},"GB_{n,d}":{"EKEYS_{1..n}":"exitX=0.65;exitY=0.4;entryX=0;entryY=0.95;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","DINF":"exitX=0.65;exitY=0.6;entryX=0;entryY=0.2;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"}},"edge_points":{"@oracles_interface":[],"GEV_{n,d}":[],"EN_{1,..,n}":[],"GB_{n,d}":[]}}
	},

	"Composition2":
	{
	    "oracles": [["EN_{1,..,n}", "SETBIT|GETA^{out}_{1..n}"], ["GB_{tdyao,n,d}", "GBL"], ["DINF_{tdyao,n,d}", "GETDINF"]],
	    "graph":
	    {
		"EN_{1,..,n}": [["EKEYS_{1..n}", "GETKEYS"]],
		"GB_{tdyao,n,d}": [["EKEYS_{1..n}", "SETKEYS_{1..n}"], ["DINF_{tdyao,n,d}", "SETDINF"]],
		"EKEYS_{1..n}": [],
		"DINF_{tdyao,n,d}": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":40,"height":170},"EN_{1,..,n}":{"x":280,"y":0,"width":90,"height":50},"GB_{tdyao,n,d}":{"x":280,"y":60,"width":90,"height":50},"EKEYS_{1..n}":{"x":480,"y":20,"width":90,"height":50},"DINF_{tdyao,n,d}":{"x":480,"y":90,"width":90,"height":50}},"edges":{"@oracles_interface":{"EN_{1,..,n}":"exitX=1;exitY=0.15;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;", "GB_{tdyao,n,d}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;", "DINF_{tdyao,n,d}":"exitX=0.85;exitY=0.67;entryX=0.05;entryY=0.7;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"EN_{1,..,n}":{"EKEYS_{1..n}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.1;entryDx=0;entryDy=0;"},"GB_{tdyao,n,d}":{"EKEYS_{1..n}":"exitX=0.65;exitY=0.4;entryX=0;entryY=0.95;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","DINF_{tdyao,n,d}":"exitX=0.65;exitY=0.6;entryX=0;entryY=0.2;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"}},"edge_points":{"@oracles_interface":[],"EN_{1,..,n}":[],"GB_{tdyao,n,d}":[]}}
	},

	"2CPA":
	{
	    "oracles": [["KEYS", "SETBIT|GETA^{out}"], ["ENC^b", "ENC"]],
	    "graph":
	    {
		"ENC^b": [["KEYS", "GETBIT|GETKEYS^{in}"]],
		"KEYS": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":10,"y":0,"width":10,"height":80},"ENC^b":{"x":90,"y":30,"width":90,"height":50},"KEYS":{"x":300,"y":0,"width":90,"height":50}},"edges":{"@oracles_interface":{"KEYS":"exitX=0.7;exitY=0.35;entryX=0;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","ENC^b":"exitX=0.65;exitY=0.55;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;"},"ENC^b":{"KEYS":"exitX=0.85;exitY=0.3;entryX=0.05;entryY=0.7;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"}},"edge_points":{"@oracles_interface":[],"ENC^b":[]}}
	},

	"RED->IND-CPA^b(se)":
	{
	    "oracles": [["RED", "SETBIT|GETA^{out}|ENC"]],
	    "graph":
	    {
		"RED": [["IND-CPA^b", "SMP|ENC"]],
		"IND-CPA^b": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":1,"height":50},"RED":{"x":80,"y":0,"width":90,"height":50},"IND-CPA^b":{"x":250,"y":0,"width":90,"height":50}},"edges":{"@oracles_interface":{"RED":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"RED":{"IND-CPA^b":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[],"RED":[]}}
	},

	"PRVSIM^0(GB, DINF)":
	{
	    "oracles": [["MOD-PRIVSIM^0", "GARBLE"]],
	    "graph":
	    {
		"MOD-PRIVSIM^0": [["EN_{1,..,n}", "SETBIT_{1,...,n}|GETA^{out}_{1,...,n}"], ["GB", "GBL"], ["DINF", "GETDINF"]],
		"EN_{1,..,n}": [["EKEYS_{1,...,n}", "GETKEYS_{1,...,n}"]],
		"GB": [["EKEYS_{1,...,n}", "SETKEYS_{1,...,n}"], ["DINF", "SETDINF"]],
		"DINF": [],
		"EKEYS_{1,...,n}": []
	    },

	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":1,"height":130},"MOD-PRIVSIM^0":{"x":80,"y":0,"width":90,"height":130},"EN_{1,..,n}":{"x":260,"y":0,"width":90,"height":50},"GB":{"x":260,"y":60,"width":90,"height":50},"DINF":{"x":500,"y":80,"width":90,"height":50},"EKEYS_{1,...,n}":{"x":500,"y":20,"width":90,"height":50}},"edges":{"@oracles_interface":{"MOD-PRIVSIM^0":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"MOD-PRIVSIM^0":{"EN_{1,..,n}":"exitX=0.65;exitY=0.4;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","GB":"exitX=1;exitY=0.65;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","DINF":"exitX=0.8;exitY=0.75;entryX=0.1;entryY=0.75;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"EN_{1,..,n}":{"EKEYS_{1,...,n}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0.15;entryY=0.25;entryDx=0;entryDy=0;"},"GB":{"EKEYS_{1,...,n}":"exitX=0.85;exitY=0.3;entryX=0.05;entryY=0.85;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","DINF":"exitX=0.85;exitY=0.7;entryX=0;entryY=0.4;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"}},"edge_points":{"@oracles_interface":[],"MOD-PRIVSIM^0":[],"EN_{1,..,n}":[],"GB":[]}}
	},

	"PRVSIM^1(SIM)":
	{
	    "oracles": [["MOD-PRIVSIM^1", "GARBLE"]],
	    "graph":
	    {
		"MOD-PRIVSIM^1": [["BITS_{1..n}^{top}", "SETBIT_{1,...,n}"], ["EV", "EVAL"], ["SIM", "GETDINF|GETA^{out}_{1,...,n}|GBL"]],
		"EV": [["BITS_{1..n}^{top}", "GETBIT_{1,...,n}"], ["BITS_{1..n}^{botttom}", "SETBIT_{1,...,n}"]],
		"SIM": [["BITS_{1..n}^{botttom}", "GETBIT_{1,...,n}"]],
		"BITS_{1..n}^{top}": [],
		"BITS_{1..n}^{botttom}": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":1,"height":120},"MOD-PRIVSIM^1":{"x":80,"y":0,"width":90,"height":120},"EV":{"x":360,"y":30,"width":90,"height":50},"SIM":{"x":260,"y":70,"width":90,"height":50},"BITS_{1..n}^{top}":{"x":500,"y":0,"width":90,"height":50},"BITS_{1..n}^{botttom}":{"x":500,"y":60,"width":90,"height":50}},"edges":{"@oracles_interface":{"MOD-PRIVSIM^1":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"MOD-PRIVSIM^1":{"BITS_{1..n}^{top}":"exitX=0.9;exitY=0.15;entryX=0.15;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","EV":"exitX=1;exitY=0.45;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","SIM":"exitX=0.75;exitY=0.65;entryX=0;entryY=0.5;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"EV":{"BITS_{1..n}^{top}":"exitX=0.85;exitY=0.25;entryX=0;entryY=0.75;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","BITS_{1..n}^{botttom}":"exitX=0.75;exitY=0.65;entryX=0.1;entryY=0.25;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"},"SIM":{"BITS_{1..n}^{botttom}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0.05;entryY=0.7;entryDx=0;entryDy=0;"}},"edge_points":{"@oracles_interface":[],"MOD-PRIVSIM^1":[],"EV":[],"SIM":[]}}
	},

	"MOD \\rightarrow SEC^0_{n,d}(GB_{yao,n,d})":
	{
	    "oracles": [["MOD", "GARBLE"]],
	    "graph":
	    {
		"MOD": [["KEYS_{1,...,d}", "SETBIT_{1,...,n}|GETA^{out}_{1,...,n}"], ["GB_{yao,n,d}", "GB_{yao,n,d}L"], ["KEYS_{d+1}", "GETKEYS^{in}_{1,...,n}"]],
		"GB_{yao,n,d}": [["KEYS_{1,...,d}", "SETKEYS_{1,...,n}"], ["KEYS_{d+1}", "GETKEYS^{out}_{1,...,n}"]],
		"KEYS_{1,...,d}": [],
		"KEYS_{d+1}": []
	    },

	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":1,"height":130},"MOD":{"x":80,"y":0,"width":90,"height":130},"GB_{yao,n,d}":{"x":260,"y":60,"width":90,"height":50},"KEYS_{d+1}":{"x":500,"y":80,"width":90,"height":50},"KEYS_{1,...,d}":{"x":500,"y":20,"width":90,"height":50}},"edges":{"@oracles_interface":{"MOD":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"MOD":{"KEYS_{1,...,d}":"exitX=0.65;exitY=0.415;entryX=0;entryY=0.15;entryPerimeter=1;exitDx=0;exitDy=0;","GB_{yao,n,d}":"exitX=1;exitY=0.65;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","KEYS_{d+1}":"exitX=0.8;exitY=0.75;entryX=0.1;entryY=0.75;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"EN_{1,..,n}":{"KEYS_{1,...,d}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0.15;entryY=0.25;entryDx=0;entryDy=0;"},"GB_{yao,n,d}":{"KEYS_{1,...,d}":"exitX=0.85;exitY=0.3;entryX=0.05;entryY=0.85;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","KEYS_{d+1}":"exitX=0.85;exitY=0.7;entryX=0;entryY=0.4;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"}},"edge_points":{"@oracles_interface":[],"MOD":[],"EN_{1,..,n}":[],"GB_{yao,n,d}":[]}}
	},

	"MOD_{n,d}->SEC^1_{n,d}(SIM_{yao,n,d})":
	{
	    "oracles": [["MOD", "GARBLE"]],
	    "graph":
	    {
		"MOD": [["KEYS_1", "SETBIT_{1,...,n},GETA^{out}_{1,...,n}"], ["GB^1_{n,1}", "GBL_1"], ["GB^1_{n,2}", "GBL_2"], ["GB^1_{n,d}", "GBL_d"], ["KEYS_{d+1}", "GETKEYS^{in}_{1,...,n}"]],
		"KEYS_1": [],
		"KEYS_2": [],
		"GB^1_{n,1}": [["KEYS_1", "GETINA^{in}_{1,...,n}"], ["LEV_{n,1}", "EVAL"], ["KEYS_2", "GETA^{out}_{1,...,n}"]],
		"LEV_{n,1}": [["KEYS_1", "GETBIT_{1,...,n}"], ["KEYS_2", "SETBIT_{1,...,n}"]],
		"KEYS_3": [],
		"GB^1_{n,2}": [["KEYS_2", "GETINA^{in}_{1,...,n}"], ["LEV_{n,2}", "EVAL"], ["KEYS_3", "GETA^{out}_{1,...,n}"]],
		"LEV_{n,2}": [["KEYS_2", "GETBIT_{1,...,n}"], ["KEYS_3", "SETBIT_{1,...,n}"]],
		"GB^1_{n,d}": [["KEYS_d", "GETINA^{in}_{1,...,n}"], ["LEV_{n,d}", "EVAL"], ["KEYS_{d+1}", "GETA^{out}_{1,...,n}"]],
		"LEV_{n,d}": [["KEYS_d", "GETBIT_{1,...,n}"], ["KEYS_{d+1}", "SETBIT_{1,...,n}"]],
		"KEYS_d": [],
		"KEYS_{d+1}": []
	    },

	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":1,"height":330}, "MOD":{"x":80,"y":0,"width":40,"height":330},"KEYS_1":{"x":500,"y":0,"width":90,"height":50},"KEYS_2":{"x":500,"y":60,"width":90,"height":50},"GB^1_{n,1}":{"x":160,"y":30,"width":90,"height":50, "color":"blue"},"LEV_{n,1}":{"x":320,"y":30,"width":90,"height":50},"KEYS_3":{"x":500,"y":120,"width":90,"height":50},"GB^1_{n,2}":{"x":160,"y":100,"width":90,"height":50, "color":"blue"},"LEV_{n,2}":{"x":320,"y":100,"width":90,"height":50},"GB^1_{n,d}":{"x":160,"y":250,"width":90,"height":50, "color":"blue"},"LEV_{n,d}":{"x":320,"y":250,"width":90,"height":50},"KEYS_d":{"x":500,"y":220,"width":90,"height":50},"KEYS_{d+1}":{"x":500,"y":280,"width":90,"height":50}},"edges":{"@oracles_interface":{"MOD":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"MOD":{"KEYS_1":"exitX=0.95;exitY=0.07;entryX=0;entryY=0.15;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","GB^1_{n,1}":"exitX=0.65;exitY=0.4;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","GB^1_{n,2}":"exitX=0.95;exitY=0.4;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","GB^1_{n,d}":"exitX=0.65;exitY=0.6;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","KEYS_{d+1}":"entryX=0.1;entryY=0.75;entryDx=0;entryDy=0;exitX=0.95;exitY=0.92;exitDx=0;exitDy=0;"},"GB^1_{n,1}":{"KEYS_1":"exitX=0.9;exitY=0.25;entryX=0;entryY=0.45;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","LEV_{n,1}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;", "KEYS_2":"exitX=1;exitY=0.75;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"LEV_{n,1}":{"KEYS_1":"exitX=0.6;exitY=0.45;entryX=0.15;entryY=0.75;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_2":"exitX=0.75;exitY=0.65;entryX=0.1;entryY=0.25;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"},"GB^1_{n,2}":{"KEYS_2":"exitX=1;exitY=0.25;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","LEV_{n,2}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_3":"exitX=0.85;exitY=0.65;entryX=0.05;entryY=0.75;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"},"LEV_{n,2}":{"KEYS_2":"exitX=0.85;exitY=0.25;entryX=0.1;entryY=0.75;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_3":"exitX=0.8;exitY=0.55;entryX=0.15;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"GB^1_{n,d}":{"KEYS_d":"exitX=0.75;exitY=0.35;entryX=0;entryY=0.4;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","LEV_{n,d}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_{d+1}":"exitX=0.75;exitY=0.65;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"},"LEV_{n,d}":{"KEYS_d":"exitX=0.85;exitY=0.3;entryX=0.05;entryY=0.7;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_{d+1}":"exitX=0.9;exitY=0.75;entryX=0.05;entryY=0.25;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"}},"edge_points":{"MOD":[],"GB^1_{n,1}":[{"x":280,"y":50}],"LEV_{n,1}":[],"GB^1_{n,2}":[{"x":280,"y":150}],"LEV_{n,2}":[],"GB^1_{n,d}":[{"x":290,"y":300}],"LEV_{n,d}":[]}},

	    "ghost":
	    {
		"KEYS_3": {"x":250, "y":165, "style":"exitX=0;exitY=0;entryX=0;entryY=0.9;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},
		"KEYS_d": {"x": 250, "y":227, "style":"exitX=0.999;exitY=0.05;entryX=0.111;entryY=0.222;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"}
	    },

	    "decoration":
	    {
		"vellipses": [{"x":200, "y":180}, {"x":540, "y":180}]
	    }


	},

	"LSEC^0_{n,i}(GB^0_{yao,n,i})":
	{
	    "oracles": [["KEYS_i", "GETA^{out}_{1,...,n},SETBIT_{1,...,n}"], ["MODGB_{n,i}", "GBL_i"], ["KEYS_{i+1}", "GETKEYS^{in}_{1,...,n}"]],
	    "graph":
	    {
		"KEYS_i": [],
		"MODGB_{n,i}": [["GATE_n", "GBLG"]],
		"GATE_n": [["ENC^0_{1,n}", "ENC_{1,...,n}"], ["KEYS_{i+1}", "GETKEYS^{out}_{1,...,n}"]],
		"ENC^0_{1,n}": [["KEYS_i", "GETKEYS^{in}_{1,...,n}"]],
		"KEYS_{i+1}": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":10,"height":110},"KEYS_i":{"x":590,"y":0,"width":90,"height":50},"MODGB_{n,i}":{"x":110,"y":30,"width":90,"height":50},"GATE_n":{"x":260,"y":30,"width":90,"height":50},"ENC^0_{1,n}":{"x":420,"y":20,"width":90,"height":50},"KEYS_{i+1}":{"x":590,"y":60,"width":90,"height":50}},"edges":{"@oracles_interface":{"KEYS_i":"exitX=0.7;exitY=0.35;entryX=0;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","MODGB_{n,i}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_{i+1}":"exitX=0.8;exitY=0.75;entryX=0.05;entryY=0.8;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"},"MODGB_{n,i}":{"GATE_n":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"GATE_n":{"ENC^0_{1,n}":"exitX=0.85;exitY=0.35;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","KEYS_{i+1}":"exitX=0.65;exitY=0.6;entryX=0.05;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"ENC^0_{1,n}":{"KEYS_i":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0.05;entryY=0.85;entryDx=0;entryDy=0;"}},"edge_points":{"@oracles_interface":[],"MODGB_{n,i}":[],"GATE_n":[],"ENC^0_{1,n}":[]}}
	},

	"HYB_{n,i}":
	{
	    "oracles": [["KEYS_i", "GETA^{out}_{1,...,n},SETBIT_{1,...,n}"], ["MODGB_{n,i}", "GBL_i"], ["KEYS_{i+1}", "GETKEYS^{in}_{1,...,n}"]],
	    "graph":
	    {
		"KEYS_i": [],
		"MODGB_{n,i}": [["GATE_n", "GBLG"]],
		"GATE_n": [["ENC^1_{1,n}", "ENC_{1,...,n}"], ["KEYS_{i+1}", "GETKEYS^{out}_{1,...,n}"]],
		"ENC^1_{1,n}": [["KEYS_i", "GETKEYS^{in}_{1,...,n}"]],
		"KEYS_{i+1}": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":10,"height":110},"KEYS_i":{"x":590,"y":0,"width":90,"height":50},"MODGB_{n,i}":{"x":110,"y":30,"width":90,"height":50},"GATE_n":{"x":260,"y":30,"width":90,"height":50},"ENC^1_{1,n}":{"x":420,"y":20,"width":90,"height":50},"KEYS_{i+1}":{"x":590,"y":60,"width":90,"height":50}},"edges":{"@oracles_interface":{"KEYS_i":"exitX=0.7;exitY=0.35;entryX=0;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","MODGB_{n,i}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_{i+1}":"exitX=0.8;exitY=0.75;entryX=0.05;entryY=0.8;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"},"MODGB_{n,i}":{"GATE_n":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"GATE_n":{"ENC^1_{1,n}":"exitX=0.85;exitY=0.35;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","KEYS_{i+1}":"exitX=0.65;exitY=0.6;entryX=0.05;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"ENC^1_{1,n}":{"KEYS_i":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0.05;entryY=0.85;entryDx=0;entryDy=0;"}},"edge_points":{"@oracles_interface":[],"MODGB_{n,i}":[],"GATE_n":[],"ENC^1_{1,n}":[]}}
	},

	"LSEC^1_{n,i}(GB^1_{yao,n,i})":
	{
	    "oracles": [["KEYS_i", "GETA^{out}_{1,...,n},SETBIT_{1,...,n}"], ["MODGB_{n,i}", "GBL_i"], ["KEYS_{i+1}", "GETKEYS^{in}_{1,...,n}"]],
	    "graph":
	    {
		"KEYS_i": [],
		"MODGB_{n,i}": [["SIM_{gate,n}", "GBLG"]],
		"SIM_{gate,n}": [["LEV_{n,i}", "EVAL"], ["KEYS_i", "GETA^{in},GETINA^{in}_{1,...,n}"], ["KEYS_{i+1}", "GETA^{out}_{1,...,n}"]],
		"LEV_{n,i}": [["KEYS_i", "GETBIT_{1,...,n}"], ["KEYS_{i+1}", "SETBIT_{1,...,n}"]],
		"KEYS_{i+1}": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":10,"height":110},"KEYS_i":{"x":590,"y":0,"width":90,"height":50},"MODGB_{n,i}":{"x":110,"y":30,"width":90,"height":50},"SIM_{gate,n}":{"x":260,"y":30,"width":90,"height":50},"LEV_{n,i}":{"x":420,"y":30,"width":90,"height":50},"KEYS_{i+1}":{"x":590,"y":60,"width":90,"height":50}},"edges":{"@oracles_interface":{"KEYS_i":"exitX=0.8;exitY=0.25;entryX=0;entryY=0.15;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","MODGB_{n,i}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_{i+1}":"exitX=0.75;exitY=0.7;entryX=0;entryY=0.8;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"MODGB_{n,i}":{"SIM_{gate,n}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"SIM_{gate,n}":{"LEV_{n,i}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_i":"exitX=0.65;exitY=0.4;entryX=0.05;entryY=0.5;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","KEYS_{i+1}":"exitX=0.75;exitY=0.65;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;"},"LEV_{n,i}":{"KEYS_i":"exitX=0.75;exitY=0.35;entryX=0.1;entryY=0.75;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_{i+1}":"exitX=0.75;exitY=0.6;entryX=0;entryY=0.15;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"}},"edge_points":{"@oracles_interface":[],"MODGB_{n,i}":[],"SIM_{gate,n}":[{"x":410,"y":50}],"LEV_{n,i}":[]}}
	},

	"SEC^0_{n,d}(GB_{yao,n,d})":
	{

	    "oracles": [["KEYS_1", "SETBIT_{1,...,n},GETA^{out}_{1,...,n}"], ["GB^0_{n,1}", "GBL_1"], ["GB^0_{n,2}", "GBL_2"], ["GB^0_{n,d}", "GBL_d"], ["KEYS_{d+1}", "GETKEYS^{in}_{1,...,n}"]],
	    "graph":
	    {
		"KEYS_1": [],
		"KEYS_2": [],
		"GB^0_{n,1}": [["KEYS_1", "GETKEYS^{in}_{1,...,n}"], ["KEYS_2", "GETKEYS^{out}_{1,...,n}"]],
		"KEYS_3": [],
		"GB^0_{n,2}": [["KEYS_2", "GETKEYS^{in}_{1,...,n}"], ["KEYS_3", "GETKEYS^{out}_{1,...,n}"]],
		"KEYS_d": [],
		"KEYS_{d+1}": [],
		"GB^0_{n,d}": [["KEYS_d", "GETKEYS^{in}_{1,...,n}"], ["KEYS_{d+1}", "GETKEYS^{out}_{1,...,n}"]]
	},

	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":20,"height":320},"KEYS_1":{"x":360,"y":0,"width":90,"height":50},"KEYS_2":{"x":360,"y":60,"width":90,"height":50},"GB^0_{n,1}":{"x":160,"y":30,"width":90,"height":50, "color":"yellow"},"KEYS_3":{"x":360,"y":120,"width":90,"height":50},"GB^0_{n,2}":{"x":160,"y":90,"width":90,"height":50, "color":"yellow"},"KEYS_d":{"x":360,"y":210,"width":90,"height":50},"KEYS_{d+1}":{"x":360,"y":270,"width":90,"height":50},"GB^0_{n,d}":{"x":160,"y":240,"width":90,"height":50, "color":"yellow"}},"edges":{"@oracles_interface":{"KEYS_1":"exitX=1;exitY=0.05;entryX=0.1;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","GB^0_{n,1}":"exitX=0.9;exitY=0.25;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","GB^0_{n,2}":"exitX=0.85;exitY=0.4;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","GB^0_{n,d}":"exitX=0.9;exitY=0.75;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","KEYS_{d+1}":"exitX=1;exitY=0.95;entryX=0;entryY=0.8;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"GB^0_{n,1}":{"KEYS_1":"exitX=0.65;exitY=0.4;entryX=0.05;entryY=0.75;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","KEYS_2":"exitX=0.75;exitY=0.65;entryX=0.05;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"GB^0_{n,2}":{"KEYS_2":"exitX=0.75;exitY=0.35;entryX=0.1;entryY=0.75;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_3":"exitX=0.85;exitY=0.7;entryX=0.05;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"GB^0_{n,d}":{"KEYS_d":"exitX=0.65;exitY=0.4;entryX=0;entryY=0.75;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","KEYS_{d+1}":"exitX=0.9;exitY=0.75;entryX=0.05;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"}},"edge_points":{"@oracles_interface":[],"GB^0_{n,1}":[],"GB^0_{n,2}":[],"GB^0_{n,d}":[]}},

	    "ghost":
	    {
		"KEYS_3": {"x":250, "y":165, "style":"exitX=0;exitY=0;entryX=0;entryY=0.9;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},
		"KEYS_d": {"x": 250, "y":217, "style":"exitX=0.999;exitY=0.05;entryX=0.111;entryY=0.222;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"}
	    },

	    "decoration":
	    {
		"vellipses": [{"x":200, "y":175}, {"x":400, "y":175}]
	    }

	},

	"H_i":
	{
	    "oracles": [["KEYS_1", "GETA_{1,...,n},SETBIT_{1,...,n}"], ["GB^1_1", "GBL_1"], ["GB^1_{i-1}", "GBL_{i-1}"], ["GB^1_i", "GBL_i"], ["GB^0_{n,i+1}", "GBL_{n,i+1}"], ["GB^0_{n,i+2}", "GBL_{n,i+2}"], ["GB^0_{n,d}", "GBL_d"], ["KEYS_{d+1}", "GETKEYS^{in}_{1,...,n}"]],
	    "graph":
	    {
		"GB^1_1": [["KEYS_1", "GETINA^{in}_{1,...,n}"], ["LEV_1", "EVAL"], ["KEYS_2", "GETA^{out}_{1,...,n}"]],
		"LEV_{n,1}": [["KEYS_1", "GETBIT_{1,...,n}"], ["KEYS_2", "SETBIT_{1,...,n}"]],
		"KEYS_1": [],
		"KEYS_2": [],
		"GB^1_{i-1}":[["KEYS_{i-1}", "GETINA^{in}_{1,...,n}"], ["LEV_{n,i-1}", "EVAL"], ["KEYS_i", "GETA^{out}_{1,...,n}"]],
		"LEV_{n,i-1}": [["KEYS_{i-1}", "GETBIT_{1,...,n}"], ["KEYS_i", "SETBIT_{1,...,n}"]],
		"KEYS_{i-1}": [],
		"KEYS_i": [],
		"GB^1_i": [["KEYS_i", "GETA_{1,...,n}, GETINA^{in}_{1,...,n}"], ["LEV_{n,i}", "EVAL"], ["KEYS_{i+1}", "GETA^{out}_{1,...,n}"]],
		"LEV_{n,i}": [["KEYS_i", "GETBIT_{1,...,n}"], ["KEYS_{i+1}", "SETBIT_{1,...,n}"]],
		"KEYS_{i+1}": [],
		"KEYS_{i+2}": [],
		"GB^0_{n,i+1}": [["KEYS_{i+1}", "GETKEYS_{1,...,n}"], ["KEYS_{i+2}", "SETKEYS_{1,...,n}"]],
		"KEYS_{i+3}": [],
		"GB^0_{n,i+2}": [["KEYS_{i+2}", "GETKEYS_{1,...,n}"], ["KEYS_{i+3}", "SETKEYS_{1,...,n}"]],
		"KEYS_d": [],
		"KEYS_{d+1}": [],
		"GB^0_{n,d}": [["KEYS_d", "GETKEYS_{1,...,n}"], ["KEYS_{d+1}", "SETKEYS_{1,...,n}"]],
	    },

	    "ghost":
	    {
		"KEYS_2": {"x":200, "y":105, "style":"exitX=0;exitY=0;entryX=0;entryY=0.9;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},
		"KEYS_{i-1}": {"x": 200, "y":167, "style":"exitX=0.999;exitY=0.05;entryX=0.111;entryY=0.222;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},
		"KEYS_{i+3}": {"x":200, "y":445, "style":"exitX=0;exitY=0;entryX=0;entryY=0.9;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},
		"KEYS_d": {"x": 200, "y":507, "style":"exitX=0.999;exitY=0.05;entryX=0.111;entryY=0.222;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"}
	    },

	    "decoration":
	    {
		"vellipses": [{"x":120, "y":120}, {"x":520, "y":120}, {"x":120, "y":460}, {"x":520, "y":460}]
	    },

	    "layout":{"nodes":{"@oracles_interface":{"x":0,"y":0,"width":20,"height":600},"GB^1_1":{"x":80,"y":30,"width":90,"height":50, "color":"blue"},"LEV_{n,1}":{"x":260,"y":30,"width":90,"height":50},"KEYS_1":{"x":480,"y":0,"width":90,"height":50},"KEYS_2":{"x":480,"y":60,"width":90,"height":50},"GB^1_{i-1}":{"x":80,"y":190,"width":90,"height":50, "color":"blue"},"LEV_{n,i-1}":{"x":270,"y":190,"width":90,"height":50},"KEYS_{i-1}":{"x":480,"y":160,"width":90,"height":50},"KEYS_i":{"x":480,"y":220,"width":90,"height":50},"GB^1_i":{"x":80,"y":260,"width":90,"height":50, "color":"blue"},"LEV_{n,i}":{"x":270,"y":260,"width":90,"height":50},"KEYS_{i+1}":{"x":480,"y":280,"width":90,"height":50},"KEYS_{i+2}":{"x":480,"y":340,"width":90,"height":50},"GB^0_{n,i+1}":{"x":270,"y":330,"width":90,"height":50, "color":"yellow"},"KEYS_{i+3}":{"x":480,"y":400,"width":90,"height":50},"GB^0_{n,i+2}":{"x":270,"y":390,"width":90,"height":50, "color":"yellow"},"KEYS_d":{"x":480,"y":500,"width":90,"height":50},"KEYS_{d+1}":{"x":480,"y":560,"width":90,"height":50},"GB^0_{n,d}":{"x":270,"y":530,"width":90,"height":50, "color":"yellow"}},"edges":{"@oracles_interface":{"KEYS_1":"exitX=0.95;exitY=0.07;entryX=0.1;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","GB^1_1":"exitX=0.75;exitY=0.3;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","GB^1_{i-1}":"exitX=1;exitY=0.35;exitDx=0;exitDy=0;entryX=0.05;entryY=0.5;entryDx=0;entryDy=0","GB^1_i":"exitX=0.75;exitY=0.486;entryX=0.05;entryY=0.5;entryDx=0;entryDy=0;","GB^0_{n,i+1}":"exitX=0.75;exitY=0.545;entryX=0.05;entryY=0.5;entryDx=0;entryDy=0;","GB^0_{n,i+2}":"exitX=0.75;exitY=0.595;entryX=0;entryY=0.5;entryDx=0;entryDy=0;","GB^0_{n,d}":"exitX=0.75;exitY=0.713;entryX=0;entryY=0.5;entryDx=0;entryDy=0;","KEYS_{d+1}":"exitX=0.75;exitY=0.74;entryX=0;entryY=0.5;entryDx=0;entryDy=0;"},"GB^1_1":{"KEYS_1":"exitX=0.65;exitY=0.4;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","LEV_{n,1}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_2":"exitX=0.9;exitY=0.75;entryX=0;entryY=0.6;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"},"LEV_{n,1}":{"KEYS_1":"exitX=0.75;exitY=0.4;entryX=0;entryY=0.85;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_2":"exitX=0.65;exitY=0.6;entryX=0.05;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"GB^1_{i-1}":{"KEYS_{i-1}":"exitX=0.85;exitY=0.3;entryX=0.05;entryY=0.45;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","LEV_{n,i-1}":"exitX=0.5;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_i":"exitX=0.65;exitY=0.6;entryX=0.05;entryY=0.6;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"LEV_{n,i-1}":{"KEYS_{i-1}":"exitX=0.85;exitY=0.3;entryX=0.1;entryY=0.75;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","KEYS_i":"entryX=0.1;entryY=0.2;exitX=0.85;exitY=0.65;exitDx=0;exitDy=0;"},"GB^1_i":{"KEYS_i":"exitX=0.85;exitY=0.3;entryX=0.15;entryY=0.6;entryDx=0;entryDy=0;","LEV_{n,i}":"exitX=0.5;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_{i+1}":"exitX=0.85;exitY=0.75;entryX=0.1;entryY=0.75;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"LEV_{n,i}":{"KEYS_i":"exitX=0.8;exitY=0.25;entryX=0.15;entryY=0.8;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_{i+1}":"exitX=0.75;exitY=0.65;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;"},"GB^0_{n,i+1}":{"KEYS_{i+1}":"exitX=0.55;exitY=0.45;entryX=0;entryY=1;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_{i+2}":"exitX=0.85;exitY=0.7;entryX=0.05;entryY=0.6;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"GB^0_{n,i+2}":{"KEYS_{i+2}":"exitX=0.55;exitY=0.45;entryX=0.05;entryY=0.9;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_{i+3}":"exitX=0.65;exitY=0.6;entryX=0;entryY=0.65;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"GB^0_{n,d}":{"KEYS_d":"exitX=0.8;exitY=0.25;entryX=0.1;entryY=0.65;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","KEYS_{d+1}":"exitX=0.75;exitY=0.65;entryX=0;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"}},"edge_points":{"@oracles_interface":[],"GB^1_1":[{"x":200,"y":55}],"LEV_{n,1}":[],"GB^1_{i-1}":[{"x":240,"y":240}],"LEV_{n,i-1}":[],"GB^1_i":[{"x":230,"y":310}],"LEV_{n,i}":[],"GB^0_{n,i+1}":[],"GB^0_{n,i+2}":[],"GB^0_{n,d}":[]}}
	},

	"SEC^1_{n,d}(SIM_{yao,n,d})":
	{
	    "oracles": [["KEYS_1", "SETBIT_{1,...,n},GETA^{out}_{1,...,n}"], ["GB^1_{n,1}", "GBL_1"], ["GB^1_{n,2}", "GBL_2"], ["GB^1_{n,d}", "GBL_d"], ["KEYS_{d+1}", "GETKEYS^{in}_{1,...,n}"]],
	    "graph":
	    {
		"KEYS_1": [],
		"KEYS_2": [],
		"GB^1_{n,1}": [["KEYS_1", "GETINA^{in}_{1,...,n}"], ["LEV_{n,1}", "EVAL"], ["KEYS_2", "GETA^{out}_{1,...,n}"]],
		"LEV_{n,1}": [["KEYS_1", "GETBIT_{1,...,n}"], ["KEYS_2", "SETBIT_{1,...,n}"]],
		"KEYS_3": [],
		"GB^1_{n,2}": [["KEYS_2", "GETINA^{in}_{1,...,n}"], ["LEV_{n,2}", "EVAL"], ["KEYS_3", "GETA^{out}_{1,...,n}"]],
		"LEV_{n,2}": [["KEYS_2", "GETBIT_{1,...,n}"], ["KEYS_3", "SETBIT_{1,...,n}"]],
		"GB^1_{n,d}": [["KEYS_d", "GETINA^{in}_{1,...,n}"], ["LEV_{n,d}", "EVAL"], ["KEYS_{d+1}", "GETA^{out}_{1,...,n}"]],
		"LEV_{n,d}": [["KEYS_d", "GETBIT_{1,...,n}"], ["KEYS_{d+1}", "SETBIT_{1,...,n}"]],
		"KEYS_d": [],
		"KEYS_{d+1}": []
	    },

	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":1,"height":330},"KEYS_1":{"x":480,"y":0,"width":90,"height":50},"KEYS_2":{"x":480,"y":60,"width":90,"height":50},"GB^1_{n,1}":{"x":140,"y":30,"width":90,"height":50, "color":"blue"},"LEV_{n,1}":{"x":320,"y":30,"width":90,"height":50},"KEYS_3":{"x":480,"y":120,"width":90,"height":50},"GB^1_{n,2}":{"x":140,"y":100,"width":90,"height":50, "color":"blue"},"LEV_{n,2}":{"x":320,"y":100,"width":90,"height":50},"GB^1_{n,d}":{"x":140,"y":250,"width":90,"height":50, "color":"blue"},"LEV_{n,d}":{"x":320,"y":250,"width":90,"height":50},"KEYS_d":{"x":480,"y":220,"width":90,"height":50},"KEYS_{d+1}":{"x":480,"y":280,"width":90,"height":50}},"edges":{"@oracles_interface":{"KEYS_1":"exitX=0.95;exitY=0.07;entryX=0;entryY=0.15;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","GB^1_{n,1}":"exitX=0.65;exitY=0.4;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","GB^1_{n,2}":"exitX=0.95;exitY=0.4;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","GB^1_{n,d}":"exitX=0.65;exitY=0.6;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;","KEYS_{d+1}":"entryX=0.1;entryY=0.75;entryDx=0;entryDy=0;exitX=0.95;exitY=0.92;exitDx=0;exitDy=0;"},"GB^1_{n,1}":{"KEYS_1":"exitX=0.9;exitY=0.25;entryX=0;entryY=0.45;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","LEV_{n,1}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;", "KEYS_2":"exitX=1;exitY=0.75;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"LEV_{n,1}":{"KEYS_1":"exitX=0.6;exitY=0.45;entryX=0.15;entryY=0.75;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_2":"exitX=0.75;exitY=0.65;entryX=0.1;entryY=0.25;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"},"GB^1_{n,2}":{"KEYS_2":"exitX=1;exitY=0.25;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","LEV_{n,2}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_3":"exitX=0.85;exitY=0.65;entryX=0.05;entryY=0.75;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"},"LEV_{n,2}":{"KEYS_2":"exitX=0.85;exitY=0.25;entryX=0.1;entryY=0.75;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_3":"exitX=0.8;exitY=0.55;entryX=0.15;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},"GB^1_{n,d}":{"KEYS_d":"exitX=0.75;exitY=0.35;entryX=0;entryY=0.4;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","LEV_{n,d}":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;","KEYS_{d+1}":"exitX=0.75;exitY=0.65;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"},"LEV_{n,d}":{"KEYS_d":"exitX=0.85;exitY=0.3;entryX=0.05;entryY=0.7;entryDx=0;entryDy=0;exitDx=0;exitDy=0;","KEYS_{d+1}":"exitX=0.9;exitY=0.75;entryX=0.05;entryY=0.25;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"}},"edge_points":{"@oracles_interface":[],"GB^1_{n,1}":[{"x":280,"y":50}],"LEV_{n,1}":[],"GB^1_{n,2}":[{"x":280,"y":150}],"LEV_{n,2}":[],"GB^1_{n,d}":[{"x":290,"y":300}],"LEV_{n,d}":[]}},

	    "ghost":
	    {
		"KEYS_3": {"x":250, "y":165, "style":"exitX=0;exitY=0;entryX=0;entryY=0.9;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"},
		"KEYS_d": {"x": 250, "y":227, "style":"exitX=0.999;exitY=0.05;entryX=0.111;entryY=0.222;exitDx=0;exitDy=0;entryDx=0;entryDy=0;"}
	    },

	    "decoration":
	    {
		"vellipses": [{"x":180, "y":180}, {"x":520, "y":180}]
	    }


	}

    };


    var deftree = {
	"Preface":
	{
	    "parent": null,
	    "contents": [
		{
		    "text": "On this page, we first define discuss garbling schemes conceptually, then define their syntax and correctness, then present Yao's garbling scheme and then turn to the security definition of garbling schemes in SSPs. <p\> A garbling scheme allows a garbler to garble a circuit \\(C\\) into  \\(\\tilde{C}\\), and it additionally also returns input encoding information \\(Z\\) and output encoding information \\(\\mathsf{dinf}\\). Given an input \\(x\\) and input garbling encoding information \\(Z\\), the garbling scheme produces an input encoding \\(\\tilde{x}\\), and an evaluator can run garbled evaluation on \\(\\tilde{C}\\), \\(\\tilde{x}\\) and \\(\\mathsf{dinf}\\) and correctness of a garbling scheme requires that the evaluator obtains \\(C(x)\\) as output. Selective security of a garbling scheme requires that \\(\\tilde{C}\\), \\(\\tilde{x}\\) and \\(\\mathsf{dinf}\\) do not leak more information than \\(C(x)\\) and the public information \\(C\\) which is modelled by a simulator who can simulate \\(\\tilde{C}\\), \\(\\tilde{x}\\) and \\(\\mathsf{dinf}\\) given only \\(C(x)\\) and \\(C\\). We now discuss syntax and security of garbling schemes in SSPs. <p\> \\(\\textbf{Syntax and correctness.}\\) A garbling scheme consists of 4 packages \\((\\mathrm{EN},\\mathrm{GB},\\mathrm{GEV},\\mathrm{DINF})\\): The garbling package \\(\\mathrm{GB}\\) exposes a \\(\\mathsf{GBL}\\) query and makes a \\(\\mathsf{SETKEYS}\\) query and a \\(\\mathsf{SETDINF}\\) query to output \\(Z\\) and decoding information \\(\\mathsf{dinf}\\), respectively. The input encoding package \\(\\mathrm{EN}\\) exposes a \\(\\mathsf{SETBIT}\\) query which allows to choose the input, makes a \\(\\mathsf{GETKEYS}\\) query to retrieve \\(Z\\) and exposes a \\(\\mathsf{GETA}^{\\text{out}}\\) query which returns the input encoding \\(\\tilde{x}\\). Here, we only consider projective garbling schemes and thus consider \\(Z\\) to have a pair of keys for each bit of \\(x\\) and \\(\\mathrm{EN}\\) will just return \\(Z_i(x_i)\\) for all  \\(i\\). We subsequently omit \\(\\mathrm{EN}\\) from the garbling scheme syntax and consider it fixed in this way. The garbled evaluation package \\(\\mathrm{GEV}\\) exposes an \\(\\mathsf{EVAL}\\) query (which takes as input a circuit \\(C\\)), makes a \\(\\mathsf{GBL}(C)\\) query to obtain \\(\\tilde{C}\\), a \\(\\mathsf{GETA}^{\\text{out}}\\) query to retrieve \\(\\tilde{x}\\), and a \\(\\mathsf{GETDINF}\\) query to obtain \\(\\mathsf{dinf}\\). The packages \\((\\mathrm{GB},\\mathrm{GEV},\\mathrm{DINF})\\) of a garbling scheme with input encoding package \\(\\mathrm{EN}\\) and storage packages \\(\\mathrm{EKEYS}\\) and \\(\\mathrm{DINF}\\)	can then be composed to the following graph.",
		},
		{
		    "graphs": [["Composition"]]
		},
        {
			"text": "Correctness of a garbling scheme requires that calling \\(\\mathsf{SETBIT}\\) with all the bits of \\(x\\) and then \\(\\mathsf{EVAL}\\) with circuit \\(C\\) yields \\(C(x)\\) as an answer. See <a href=\"https://eprint.iacr.org/2021/1453\">Brzuska-Oechsner</a> for details of how to model correctness in SSPs. <p\> \\(\\textbf{Yao's Garbling Scheme Construction.}\\) We consider Yao's garbling scheme which associates with each wire \\(j\\) in a circuit a pair of keys \\(k^j_0\\) and \\(k^j_1\\) and then garbles each gate computing operation \\(\\mathsf{op}(x^\\ell,x^r)=x^j)\\) on left input bit \\(x^\\ell\\) and the right input bit \\(x^r\\) to obtain output bit \\(x^j\\) by returning the (unordered) set of the following four ciphertexts: $$\\mathsf{enc}(k_0^r,\\mathsf{enc}(k_0^\\ell,k^j_{\\mathsf{op}(0,0)}))$$ $$\\mathsf{enc}(k_0^r,\\mathsf{enc}(k_1^\\ell,k^j_{\\mathsf{op}(1,0)}))$$ $$\\mathsf{enc}(k_1^r,\\mathsf{enc}(k_0^\\ell,k^j_{\\mathsf{op}(0,1)}))$$ $$\\mathsf{enc}(k_1^r,\\mathsf{enc}(k_1^\\ell,k^j_{\\mathsf{op}(1,1)}))$$ Correctness follows because given the keys for the values \\(x^\\ell\\) and \\(x^r\\) on the input wires allows to obtain the key for \\(x^j=\\mathsf{op}(x^\\ell,x^r))\\) on the output wire. Security follows, intuitively, because one can only open a single ciphertext out of the 4 ciphertexts computed above and can thus not associate a key to a bit and learn internal wire values. We will review this argument more precisely on the <a href=\"https://eprint.iacr.org/2021/1453\">proof</a> page. For now, we want to introduce the code of Yao's garbling scheme. The decoding information \\(\\mathsf{dinf}\\) consists of a table \\(Z\\) which, for each output wire \\(i\\) gives a \\(0\\)-key and a \\(1\\)-key. This information will be generated by the garbling package \\(\\mathrm{GB}_\\text{tdyao,n,d}\\) and the \\(\\mathsf{DINF}\\) oracle of \\(\\mathrm{DINF}_\\text{tdyao,n,d}\\) just returns it. The \\(\\mathsf{GBL}\\) oracle of \\(\\mathrm{GB}_\\text{tdyao,n,d}\\) first samples keys for all wires, and then, for each gate, computes the four ciphertexts and returns those. We now compose the packages as we did previously to illustrate and recall how the different components of Yao's garbling scheme interact.	When clicking on the packages below, you will be guided to the corresponding code on the right."
		},
		{
		    "graphs": [["Composition2"]]
		},
		{
			"text":	"(\\textbf{Security.}\\) We model security as indistinguishability between a real game and an ideal game, which both expose the \\(\\tilde{C}\\), \\(\\tilde{x}\\) and \\(\\mathsf{dinf}\\) to the adversary. Concretely, the real game \\(\\mathrm{PRVSIM}^0(\\mathrm{GB},\\mathrm{DINF})\\) composes the input encoding package \\(\\mathrm{EN}\\) and the garbling scheme packages \\(\\mathrm{GB}\\)\\ and(\\mathrm{DINF}\\) packages again with the two packages \\(\\mathrm{EKEYS}\\) and \\(\\mathrm{DINF}\\) which store the input and output encoding information, respectively.	Security states that there exists a simulation package \\(\\mathrm{SIM}\\) which makes \\(\\mathsf{GETBIT}\\) queries to retrieve \\(C(x)\\) and can simulate (\\(\\tilde{C}\\),\\(\\tilde{x}\\),\\(\\mathsf{dinf}\\)), which means the the real game \\(\\mathrm{PRVSIM}^0(\\mathrm{EN},\\mathrm{GB})\\) and the ideal game \\(\\mathrm{PRVSIM}^1(\\mathrm{SIM})\\) are indistinguishable. Both games have an adaptor package \\(\\mathrm{MODPRVSIM}^b\\) which ensures that the adversary's interface is identical in the real and the ideal game."
		},
	    ],
	    "type": {
		"unstructured": true
	    }
	},


	"Definition (Simluation-based security of garbling schemes)":
	{
	    "parent": "Preface",
	    "contents": [
		{
		    "text": "A garbling scheme \\((\\mathrm{GB},\\mathrm{DINF},\\mathrm{GEV})\\) achieves simulation-based security if there exists a PPT simulator package \\(\\mathrm{SIM}\\) such that for all PPT adversaries \\(\\mathcal{A}\\), $$\\mathsf{Adv}(\\mathcal{A}; \\mathsf{PRVSIM}^0(\\mathrm{GB}, \\mathrm{DINF}), \\mathrm{PRVSIM}^1(\\mathrm{SIM}))$$ is negligible.",
		},
		{
		    "graphs": [["PRVSIM^0(GB, DINF)"], ["PRVSIM^1(SIM)"]]
		}
	    ]
	},

	"Preface2":
	{
	    "parent": "Def",
	    "contents": [
		{
		    "text": "\\(\\textbf{Yao's Garbling Scheme Construction.}\\) We consider Yao's garbling scheme which associates with each wire \\(j\\) in a circuit a pair of keys \\(k^j_0\\) and \\(k^j_1\\) and then garbles each gate computing operation \\(\\mathsf{op}(x^\\ell,x^r)=x^j)\\) on left input bit \\(x^\\ell\\) and the right input bit \\(x^r\\) to obtain output bit \\(x^j\\) by returning the (unordered) set of the following four ciphertexts: $$\\mathsf{enc}(k_0^r,\\mathsf{enc}(k_0^\\ell,k^j_{\\mathsf{op}(0,0)}))$$ $$\\mathsf{enc}(k_0^r,\\mathsf{enc}(k_1^\\ell,k^j_{\\mathsf{op}(1,0)}))$$ $$\\mathsf{enc}(k_1^r,\\mathsf{enc}(k_0^\\ell,k^j_{\\mathsf{op}(0,1)}))$$ $$\\mathsf{enc}(k_1^r,\\mathsf{enc}(k_1^\\ell,k^j_{\\mathsf{op}(1,1)}))$$ Correctness follows because given the keys for the values \\(x^\\ell\\) and \\(x^r\\) on the input wires allows to obtain the key for \\(x^j=\\mathsf{op}(x^\\ell,x^r))\\) on the output wire. Security follows, intuitively, because one can only open a single ciphertext out of the 4 ciphertexts computed above and can thus not associate a key to a bit and learn internal wire values. We will review this argument more precisely on the <a href=\"https://eprint.iacr.org/2021/1453\">proof</a> page. For now, we want to introduce the code of Yao's garbling scheme. The decoding information \\(\\mathsf{dinf}\\) consists of a table \\(Z\\) which, for each output wire \\(i\\) gives a \\(0\\)-key and a \\(1\\)-key. This information will be generated by the garbling package \\(\\mathrm{GB}_\\text{tdyao,n,d}\\) and the \\(\\mathsf{DINF}\\) oracle of \\(\\mathrm{DINF}_\\text{tdyao,n,d}\\) just returns it. The \\(\\mathsf{GBL}\\) oracle of \\(\\mathrm{GB}_\\text{tdyao,n,d}\\) first samples keys for all wires, and then, for each gate, computes the four ciphertexts and returns those. When clicking on the packages below, you will be guided to the corresponding code on the right.",
		}
	    ],
	    "type": {
		"unstructured": true
	    }
	},


	"Yao Construction":
	{
	    "parent": "Def",
	    "contents": [
		{
		    "text": "",
		}
	    ]
	}
    };

    var def = {
	"name": def_name,
	"prooftree": deftree,
	"monolithic_pkgs": monolithic_pkgs,
	"modular_pkgs": modular_pkgs
    }

    var wrapper_width = {proof_width: '70%', oracle_width: '28%'}
    add_def(def, wrapper_width);


}

newyao_driver();
