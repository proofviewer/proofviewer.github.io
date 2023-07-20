function driver() {
    var proof_name = "2CPA and (standard) IND-CPA equivalence";

    var monolithic_pkgs = {
		"IND-CPA^b":
		{
			"oracles":
			{
			"SMP":
			{
				"code": "@assert k = \\bot;k @sample \\{0,1\\}^{\\lambda};@return ()",
				"params": []
			},

			"ENC":
			{
				"code": "@assert k \\neq \\bot;@assert |m_0| = |m_1|; c @sample enc(k, m_b);@return c",
				"params": ["m_0", "m_1"]
			}
			}
		},

		"ENC^b":
		{
			"oracles":
			{
			"ENC":
			{
				"code": "Z^{in} @gets \\mathsf{GETKEYS}^{in}();@assert |m_0| = |m_1|;c @sample enc(Z^{in}(d), m_0);@if b = 1:;@> z^{in} @gets \\mathsf{GETBIT}();@> @if z^{in} \\neq d @then;@> @> c @sample enc(Z^{in}(d), m_b);@return c",
				"params": ["d", "m_0", "m_1"]
			}
			}
		},

		"KEYS":
	{
	    "oracles":
	    {
		"GETA^{out}" :
		{
		    "code": "@assert z \\neq @bot;\\mathsf{flag} @gets 1;@if Z = @bot @then;    Z(0) @sample \\{0,1\\}^\\lambda;    Z(1) @sample \\{0,1\\}^\\lambda;@return Z(z);",
		    "params": []
		},

		"SETBIT" :
		{
		    "code": "@assert z = @bot;z @gets z';@return ();",
		    "params": ["z'"]
		},

		"GETKEYS^{in}" :
		{
		    "code": "@assert \\mathsf{flag};@return Z;",
		    "params": []
		},

		"GETBIT" :
		{
		    "code": "@assert z \\neq @bot;@return z",
		    "params": []
		}

	    }

	},


	"RED":
	{
	    "oracles":
	    {
		"SETBIT":
		{
		    "code": "@assert z = \\bot;z @gets z';@return ()",
		    "params": ["z'"]
		},

		"GETA^{out}":
		{
		    "code": "@assert z \\neq \\bot;\\mathsf{flag} @gets 1;@if Z = \\bot @then;@> Z(z) @sample \\{0,1\\}^{\\lambda};@> \\mathsf{SMP}();@return Z(z)",
		    "params": []
		},

		"ENC":
		{
		    "code": "@assert \\mathsf{flag} = 1;@assert |m_0| = |m_1|; c @sample enc(Z(z), m_0);@if z \\neq d @then;@> c @gets \\mathsf{ENC}(m_0, m_1);@return c",
		    "params": ["d", "m_0", "m_1"]
		}
	    }
	},

    };

    var modular_pkgs = {
	"IND-CPA^b":
	{
	    "oracles": [["IND-CPA^b", "SMP|ENC"]],
	    "graph":
	    {
		"IND-CPA^b": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":10,"height":50},"IND-CPA^b":{"x":100,"y":0,"width":90,"height":50}},"edges":{"@oracles_interface":{"IND-CPA^b":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[]}}
	},

	"2CPA^b":
	{
	    "oracles": [["KEYS", "SETBIT,GETA^{out}"], ["ENC^b", "ENC"]],
	    "graph":
	    {
		"ENC^b": [["KEYS", "GETBIT|GETKEYS^{in}"]],
		"KEYS": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":10,"y":0,"width":10,"height":80},"ENC^b":{"x":90,"y":30,"width":90,"height":50},"KEYS":{"x":300,"y":0,"width":90,"height":50}},"edges":{"@oracles_interface":{"KEYS":"exitX=0.7;exitY=0.35;entryX=0;entryY=0.25;exitDx=0;exitDy=0;entryDx=0;entryDy=0;","ENC^b":"exitX=0.65;exitY=0.55;entryX=0;entryY=0.5;entryPerimeter=1;exitDx=0;exitDy=0;"},"ENC^b":{"KEYS":"exitX=0.85;exitY=0.3;entryX=0.05;entryY=0.7;entryDx=0;entryDy=0;exitDx=0;exitDy=0;"}},"edge_points":{"@oracles_interface":[],"ENC^b":[]}}
	},

	"RED->IND-CPA^b":
	{
	    "oracles": [["RED", "SETBIT|GETA^{out}|ENC"]],
	    "graph":
	    {
		"RED": [["IND-CPA^b", "SMP|ENC"]],
		"IND-CPA^b": []
	    },
	    "layout": {"nodes":{"@oracles_interface":{"x":0,"y":0,"width":1,"height":50},"RED":{"x":80,"y":0,"width":90,"height":50},"IND-CPA^b":{"x":250,"y":0,"width":90,"height":50}},"edges":{"@oracles_interface":{"RED":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"},"RED":{"IND-CPA^b":"exitX=1;exitY=0.5;exitPerimeter=1;entryX=0;entryY=0.5;entryPerimeter=1;"}},"edge_points":{"@oracles_interface":[],"RED":[]}}
	},
    };

    var prooftree = {
	"Preface":
	{
	    "parent": null,
	    "contents": [
		{
		    "text": "A symmetric encryption scheme \\(\\mathsf{se}\\) consists of two PPT algorithms \\(\\mathsf{se.enc}\\) and \\(\\mathsf{se.dec}\\) such that for all messages \\(m\\), keys \\(k\\) and (implicit) randomness of encryption, it holds that \\(\\mathsf{se.dec}(k,\\mathsf{se.enc}(k,m))=m\\).<\a> \\(\\textbf{Security.}\\) The ciphertext \\(c\\leftarrow^{\$}\\mathsf{se.enc}(k,m)\\) should not leak anything beyond the length of \\(m\\). We model this as indistinguishability under chosen plaintext attacks (IND-CPA), which is a game that exposes an \\(\\mathsf{ENC}\\) oracle to the adversary who can then (repeatedly) submit two messages \\(m_0\\) and \\(m_1\\) of the same length and will receive an encryption of \\(m_b\\). After querying the \\(\\mathsf{ENC}\\) oracle a polynomial number of times, the adversary needs to guess whether \\(b=0\\) or \\(b=1\\). Additionally, before querying \\(\\mathsf{ENC}\\) for the first time, the adversary needs to call \\(\\mathsf{SMP}\\) to instruct the game to sample the key."
		}
	    ],
	    "type": {
		"unstructured": true
	    }
	},

	"Definition (Indistinguishability under Chosen Plaintext Attacks (IND-CPA))":
	{
	    "parent": "ExplanationStepTemplate",
	    "contents": [
		{
		    "text": "A symmetric encryption scheme \\(\\mathsf{se}\\) achieves indistinguishability under chosen plaintext attacks (IND-CPA) if for all PPT adversaries \\(\\mathcal{A}\\), the advantage \\(\\mathsf{Adv}(\\mathcal{A};\\mathrm{IND\\text{-}CPA}^0, \\mathrm{IND\\text{-}CPA}^1)\\) is negligible."
		},
		{
		    "graphs": [["IND-CPA^b"]]
		},
		{
		    "text": "We now modularize the above \\(\\mathrm{IND\\text{-}CPA}^b\\) game into a \\(\\textbf{stateless}\\) encryption package \\(\\mathrm{ENC}^b\\) and a \\(\\textbf{stateful}\\) package \\(\\mathrm{KEYS}\\) which stores the key. In order to make this modularization more useful for our later proof of Yao's garbling scheme, \\(\\mathrm{KEYS}\\) actually stores two keys, one of which the adversary can obtain and one which the adversary cannot obtain, i.e., the adversary can make a \\(\\mathsf{SETBIT}(d)\\) query with a bit \\(z\\) to choose whether they want to learn the \\(0\\)-key \\(k_0\\) or the \\(1\\)-key \\(k_1\\). Then, the adversary can make a \\(\\mathsf{GETA}\\) query to obtain \\(k_z\\). The name \\(\\mathsf{GETA}\\) is inspired by the fact that in the analysis of Yao's garbling scheme the insecure keys is usually called the \\(\\textbf{active}\\) key. Subsequently, the adversary can make encryption queries to \\(\\mathsf{ENC}\\) by submitting two messages \\(m_0\\) and \\(m_1\\) of equal length as well as a bit \\(d\\) indicating that this is a query for \\(k_d\\). The oracle \\(\\mathsf{ENC}\\) returns always an encryption of \\(m_0\\) if \\(k_d\\) is the active (=insecure) key. Else, \\(\\mathsf{ENC}\\) returns an encryption of \\(m_b\\). We call this security notion 2CPA-security to hint at the fact that the game stores two keys (even if only one of them is secure)."
		}
	],
	},

	"Definition (2CPA security)":
	{
	    "parent": "Definition (Indistinguishability under Chosen Plaintext Attacks (IND-CPA))",
	    "contents": [
		{
		    "text": "A symmetric encryption scheme achieves \\(\\mathsf{se}\\) 2CPA-security if for all PPT adversaries \\(\\mathcal{A}\\), the advantage \\(\\mathsf{Adv}(\\mathcal{A};\\mathrm{2CPA}^0, \\mathrm{2CPA}^1)\\) is negligible."
		},
		{
		    "graphs": [["2CPA^b"]]
		},
		{
		"text": "We next show that IND-CPA security implies 2CPA security by giving a reduction \\(\\mathrm{RED}\\) such that \\(\\mathrm{RED}\\rightarrow\\mathrm{IND\\text{-}CPA}^b\\) has identical input-output behaviour to \\(\\mathrm{2CPA}^b \\)."
	    }
	],
	},

	"Lemma": {
	    "parent": "Preface",
	    "contents": [
		{
		    "text": "Let \\(se\\) be a symmetric encryption scheme. For reduction \\(\\mathrm{RED}\\), it holds that for any PPT adversary \\(\\mathcal{A}\\), $$\\mathsf{Adv}(\\mathcal{A}; \\mathrm{2CPA}^0, \\mathrm{2CPA}^1) \\leq \\mathsf{Adv}(\\mathcal{A} \\rightarrow \\mathsf{RED}; \\mathrm{IND\\text{-}CPA}^0, \\mathrm{IND\\text{-}CPA}^1).$$"
		},
		{
		    "graphs": [["2CPA^b", "RED->IND-CPA^b"]]
		},
		{
		    "text": "We compare the behaviour of the two games by inlining. Concretely, to understand the behaviour of \\(\\mathrm{RED}\\rightarrow\\mathrm{IND\\text{-}CPA}^b(se)\\), we inline the code of \\(\\mathrm{IND\\text{-}CPA}^b(se)\\) into reduction \\(\\mathrm{RED}\\), and analogously, we inline the code of \\(\\mathrm{KEYS}\\) into \\(\\mathrm{ENC}^b\\) and then compare the behaviour and see, via small, successive code changes that it is identical."
		}
	    ],
	    "type":
	    {
		"codeq":
		{
		    "columns":
		    [
			{
			    "packages":
			    {
				"ENC^b":
				{
				    "oracles":
				    {
					"ENC":
					{
					    "code": "Z^{in} @gets \\mathsf{GETKEYS}^{in}();@assert |m_0| = |m_1|;c @sample enc(Z^{in}(d), m_0);@if b = 1:;@> z^{in} @gets \\mathsf{GETBIT}();@> @if z^{in} \\neq d @then;@> @> c @sample enc(Z^{in}(d), m_b);@return c",
					    "params": ["d", "m_0", "m_1"]
					}
				    }
				},

				"KEYS":
				{
				    "oracles":
				    {
					"SETBIT" :
					{
					    "code": "@assert z = @bot;z @gets z';@return ();",
					    "params": ["z'"]
					},

					"GETA^{out}" :
					{
					    "code": "@assert z \\neq @bot;\\mathsf{flag} @gets 1;@if Z = @bot @then;    Z(0) @sample \\{0,1\\}^\\lambda;    Z(1) @sample \\{0,1\\}^\\lambda;@return Z(z);",
					    "params": []
					},

					"GETBIT" :
					{
					    "code": "@assert z \\neq @bot;@return z",
					    "params": []
					},

					"GETKEYS^{in}" :
					{
					    "code": "@assert \\mathsf{flag};@return Z;",
					    "params": []
					}

				    }
				}
			    }
			},

			{
			    "packages":
			    {
				"GAME^b_2":
				{
				    "oracles":
				    {
					"ENC":
					{
					    "code": "@assert \\mathsf{flag};@assert |m_0| = |m_1|;c @sample enc(Z(d), m_0);@if b = 1:;@> @assert z \\neq \\bot;@> @if z \\neq d @then;@> @> c @sample enc(Z(d), m_b);@return c;",
					    "params": ["d", "m_0", "m_1"]
					},

					"SETBIT" :
					{
					    "code": "@assert z = @bot;z @gets z';@return ();",
					    "params": ["z'"]
					},

					"GETA^{out}" :
					{
					    "code": "@assert z \\neq @bot;\\mathsf{flag} @gets 1;@if Z = @bot @then;    Z(0) @sample \\{0,1\\}^\\lambda;    Z(1) @sample \\{0,1\\}^\\lambda;@return Z(z);",
					    "params": []
					},

				    }
				}
			    }
			},

			{
			    "packages":
			    {
				"GAME^b_3":
				{
				    "oracles":
				    {
					"ENC":
					{
					    "code": "@assert \\mathsf{flag};@assert |m_0| = |m_1|;c @sample enc(Z(d), m_0);@if z \\neq d @then;;;@> @> c @sample enc(Z(d), m_b);@return c;",
					    "params": ["d", "m_0", "m_1"]
					},

					"SETBIT" :
					{
					    "code": "@assert z = @bot;z @gets z';@return ();",
					    "params": ["z'"]
					},

					"GETA^{out}" :
					{
					    "code": "@assert z \\neq @bot;\\mathsf{flag} @gets 1;@if Z = @bot @then;@> Z(0) @sample \\{0,1\\}^\\lambda;@> Z(1) @sample \\{0,1\\}^\\lambda;@return Z(z);",
					    "params": []
					},

				    }
				}
			    }
			},

			{
			    "packages":
			    {
				"GAME^b_4":
				{
				    "oracles":
				    {
					"ENC":
					{
					    "code": "@assert \\mathsf{flag};@assert |m_0| = |m_1|;c @sample enc(Z(d), m_0);@if z \\neq d @then;@> @assert k \\neq \\bot;@> @> c @sample enc(k, m_b);;@return c;",
					    "params": ["d", "m_0", "m_1"]
					},

					"SETBIT" :
					{
					    "code": "@assert z = @bot;z @gets z';@return ();",
					    "params": ["z'"]
					},

					"GETA^{out}" :
					{
					    "code": "@assert z \\neq @bot;\\mathsf{flag} @gets 1;@if Z = @bot @then;@> Z(z) @sample \\{0,1\\}^\\lambda;@> @assert k = \\bot;@> k @sample \\{0,1\\}^{\\lambda};@return Z(z);",
					    "params": []
					},

				    }
				}
			    }
			},

			{
			    "packages":
			    {
				"RED":
				{
				    "oracles":
				    {
					"ENC":
					{
					    "code": "@assert \\mathsf{flag};@assert |m_0| = |m_1|;c @sample enc(Z(d), m_0);@if z \\neq d @then;;@> @> c @sample \\mathsf{ENC}(m_0, m_1);;@return c;",
					    "params": ["d", "m_0", "m_1"]
					},

					"SETBIT" :
					{
					    "code": "@assert z = @bot;z @gets z';@return ();",
					    "params": ["z'"]
					},

					"GETA^{out}" :
					{
					    "code": "@assert z \\neq @bot;\\mathsf{flag} @gets 1;@if Z = @bot @then;@> Z(z) @sample \\{0,1\\}^\\lambda;;@> \\mathsf{SMP}();@return Z(z);",
					    "params": []
					}
				    }
				},

				"IND-CPA^b(se)":
				{
				    "oracles":
				    {
					"SMP":
					{
					    "code": "@assert k = \\bot;k @sample \\{0,1\\}^{\\lambda};@return k",
					    "params": []
					},

					"ENC":
					{
					    "code": "@assert k \\neq \\bot;@assert |m_0| = |m_1|; c @sample enc(k, m_b);@return c",
					    "params": ["m_0", "m_1"]
					}
				    }
				}
			    }
			}
		    ]
		},

		"cuts": [

		]
	    }
	}


    };

    var proof = {
	"name": proof_name,
	"prooftree": prooftree,
	"monolithic_pkgs": monolithic_pkgs,
	"modular_pkgs": modular_pkgs
    }

    var wrapper_width = {proof_width: '70%', oracle_width: '28%'}
    add_def(proof, wrapper_width);

    return proof;
}

var twocpa_proof = driver();
