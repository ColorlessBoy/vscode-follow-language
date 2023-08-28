// Generated from ./antlr4/ANTLRFollowLexer.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class ANTLRFollowLexer extends Lexer {
	public static readonly WS = 1;
	public static readonly NL = 2;
	public static readonly SC = 3;
	public static readonly LINE_COMMENT = 4;
	public static readonly BLOCK_COMMENT = 5;
	public static readonly LBRACE = 6;
	public static readonly RBRACE = 7;
	public static readonly LBRACKET = 8;
	public static readonly RBRACKET = 9;
	public static readonly LPAREN = 10;
	public static readonly RPAREN = 11;
	public static readonly EQ = 12;
	public static readonly COMMA = 13;
	public static readonly SINGLE_QUOTA = 14;
	public static readonly STRING = 15;
	public static readonly KW_IMPORT = 16;
	public static readonly KW_TYPE = 17;
	public static readonly KW_CONST = 18;
	public static readonly KW_VAR = 19;
	public static readonly KW_PROP = 20;
	public static readonly KW_AXIOM = 21;
	public static readonly KW_THEOREM = 22;
	public static readonly KW_ASSUME = 23;
	public static readonly KW_TARGET = 24;
	public static readonly ID = 25;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"WS", "NL", "SC", "LINE_COMMENT", "BLOCK_COMMENT", "LBRACE", "RBRACE", 
		"LBRACKET", "RBRACKET", "LPAREN", "RPAREN", "EQ", "COMMA", "SINGLE_QUOTA", 
		"STRING", "KW_IMPORT", "KW_TYPE", "KW_CONST", "KW_VAR", "KW_PROP", "KW_AXIOM", 
		"KW_THEOREM", "KW_ASSUME", "KW_TARGET", "ID",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, "'{'", 
		"'}'", "'['", "']'", "'('", "')'", "'='", "','", "'''", undefined, "'import'", 
		"'type'", "'const'", "'var'", "'prop'", "'axiom'", "'thm'", "'-|'", "'|-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "WS", "NL", "SC", "LINE_COMMENT", "BLOCK_COMMENT", "LBRACE", 
		"RBRACE", "LBRACKET", "RBRACKET", "LPAREN", "RPAREN", "EQ", "COMMA", "SINGLE_QUOTA", 
		"STRING", "KW_IMPORT", "KW_TYPE", "KW_CONST", "KW_VAR", "KW_PROP", "KW_AXIOM", 
		"KW_THEOREM", "KW_ASSUME", "KW_TARGET", "ID",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ANTLRFollowLexer._LITERAL_NAMES, ANTLRFollowLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ANTLRFollowLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(ANTLRFollowLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "ANTLRFollowLexer.g4"; }

	// @Override
	public get ruleNames(): string[] { return ANTLRFollowLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return ANTLRFollowLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return ANTLRFollowLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return ANTLRFollowLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x1B\xA9\b\x01" +
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t" +
		"\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x03\x02\x06\x027\n\x02" +
		"\r\x02\x0E\x028\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x05\x03@\n\x03" +
		"\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05" +
		"\x03\x05\x07\x05L\n\x05\f\x05\x0E\x05O\v\x05\x03\x05\x03\x05\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x07\x06W\n\x06\f\x06\x0E\x06Z\v\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\v\x03" +
		"\v\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10\x03" +
		"\x10\x07\x10s\n\x10\f\x10\x0E\x10v\v\x10\x03\x10\x03\x10\x03\x11\x03\x11" +
		"\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14\x03\x14" +
		"\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03\x18" +
		"\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03\x1A\x06\x1A\xA6\n\x1A\r\x1A" +
		"\x0E\x1A\xA7\x04Xt\x02\x02\x1B\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02" +
		"\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02" +
		"\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x12#\x02\x13%" +
		"\x02\x14\'\x02\x15)\x02\x16+\x02\x17-\x02\x18/\x02\x191\x02\x1A3\x02\x1B" +
		"\x03\x02\x06\x04\x02\v\v\"\"\x04\x02\f\f\x0F\x0F\x03\x02\f\f\x07\x02/" +
		"02;C\\aac|\x02\xAE\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02" +
		"\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r" +
		"\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13" +
		"\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19" +
		"\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F" +
		"\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03\x02\x02\x02\x02%\x03\x02" +
		"\x02\x02\x02\'\x03\x02\x02\x02\x02)\x03\x02\x02\x02\x02+\x03\x02\x02\x02" +
		"\x02-\x03\x02\x02\x02\x02/\x03\x02\x02\x02\x021\x03\x02\x02\x02\x023\x03" +
		"\x02\x02\x02\x036\x03\x02\x02\x02\x05?\x03\x02\x02\x02\x07C\x03\x02\x02" +
		"\x02\tG\x03\x02\x02\x02\vR\x03\x02\x02\x02\r^\x03\x02\x02\x02\x0F`\x03" +
		"\x02\x02\x02\x11b\x03\x02\x02\x02\x13d\x03\x02\x02\x02\x15f\x03\x02\x02" +
		"\x02\x17h\x03\x02\x02\x02\x19j\x03\x02\x02\x02\x1Bl\x03\x02\x02\x02\x1D" +
		"n\x03\x02\x02\x02\x1Fp\x03\x02\x02\x02!y\x03\x02\x02\x02#\x80\x03\x02" +
		"\x02\x02%\x85\x03\x02\x02\x02\'\x8B\x03\x02\x02\x02)\x8F\x03\x02\x02\x02" +
		"+\x94\x03\x02\x02\x02-\x9A\x03\x02\x02\x02/\x9E\x03\x02\x02\x021\xA1\x03" +
		"\x02\x02\x023\xA5\x03\x02\x02\x0257\t\x02\x02\x0265\x03\x02\x02\x0278" +
		"\x03\x02\x02\x0286\x03\x02\x02\x0289\x03\x02\x02\x029:\x03\x02\x02\x02" +
		":;\b\x02\x02\x02;\x04\x03\x02\x02\x02<=\x07\x0F\x02\x02=@\x07\f\x02\x02" +
		">@\t\x03\x02\x02?<\x03\x02\x02\x02?>\x03\x02\x02\x02@A\x03\x02\x02\x02" +
		"AB\b\x03\x02\x02B\x06\x03\x02\x02\x02CD\x07=\x02\x02DE\x03\x02\x02\x02" +
		"EF\b\x04\x02\x02F\b\x03\x02\x02\x02GH\x071\x02\x02HI\x071\x02\x02IM\x03" +
		"\x02\x02\x02JL\n\x04\x02\x02KJ\x03\x02\x02\x02LO\x03\x02\x02\x02MK\x03" +
		"\x02\x02\x02MN\x03\x02\x02\x02NP\x03\x02\x02\x02OM\x03\x02\x02\x02PQ\x07" +
		"\f\x02\x02Q\n\x03\x02\x02\x02RS\x071\x02\x02ST\x07,\x02\x02TX\x03\x02" +
		"\x02\x02UW\v\x02\x02\x02VU\x03\x02\x02\x02WZ\x03\x02\x02\x02XY\x03\x02" +
		"\x02\x02XV\x03\x02\x02\x02Y[\x03\x02\x02\x02ZX\x03\x02\x02\x02[\\\x07" +
		",\x02\x02\\]\x071\x02\x02]\f\x03\x02\x02\x02^_\x07}\x02\x02_\x0E\x03\x02" +
		"\x02\x02`a\x07\x7F\x02\x02a\x10\x03\x02\x02\x02bc\x07]\x02\x02c\x12\x03" +
		"\x02\x02\x02de\x07_\x02\x02e\x14\x03\x02\x02\x02fg\x07*\x02\x02g\x16\x03" +
		"\x02\x02\x02hi\x07+\x02\x02i\x18\x03\x02\x02\x02jk\x07?\x02\x02k\x1A\x03" +
		"\x02\x02\x02lm\x07.\x02\x02m\x1C\x03\x02\x02\x02no\x07)\x02\x02o\x1E\x03" +
		"\x02\x02\x02pt\x05\x1D\x0F\x02qs\v\x02\x02\x02rq\x03\x02\x02\x02sv\x03" +
		"\x02\x02\x02tu\x03\x02\x02\x02tr\x03\x02\x02\x02uw\x03\x02\x02\x02vt\x03" +
		"\x02\x02\x02wx\x05\x1D\x0F\x02x \x03\x02\x02\x02yz\x07k\x02\x02z{\x07" +
		"o\x02\x02{|\x07r\x02\x02|}\x07q\x02\x02}~\x07t\x02\x02~\x7F\x07v\x02\x02" +
		"\x7F\"\x03\x02\x02\x02\x80\x81\x07v\x02\x02\x81\x82\x07{\x02\x02\x82\x83" +
		"\x07r\x02\x02\x83\x84\x07g\x02\x02\x84$\x03\x02\x02\x02\x85\x86\x07e\x02" +
		"\x02\x86\x87\x07q\x02\x02\x87\x88\x07p\x02\x02\x88\x89\x07u\x02\x02\x89" +
		"\x8A\x07v\x02\x02\x8A&\x03\x02\x02\x02\x8B\x8C\x07x\x02\x02\x8C\x8D\x07" +
		"c\x02\x02\x8D\x8E\x07t\x02\x02\x8E(\x03\x02\x02\x02\x8F\x90\x07r\x02\x02" +
		"\x90\x91\x07t\x02\x02\x91\x92\x07q\x02\x02\x92\x93\x07r\x02\x02\x93*\x03" +
		"\x02\x02\x02\x94\x95\x07c\x02\x02\x95\x96\x07z\x02\x02\x96\x97\x07k\x02" +
		"\x02\x97\x98\x07q\x02\x02\x98\x99\x07o\x02\x02\x99,\x03\x02\x02\x02\x9A" +
		"\x9B\x07v\x02\x02\x9B\x9C\x07j\x02\x02\x9C\x9D\x07o\x02\x02\x9D.\x03\x02" +
		"\x02\x02\x9E\x9F\x07/\x02\x02\x9F\xA0\x07~\x02\x02\xA00\x03\x02\x02\x02" +
		"\xA1\xA2\x07~\x02\x02\xA2\xA3\x07/\x02\x02\xA32\x03\x02\x02\x02\xA4\xA6" +
		"\t\x05\x02\x02\xA5\xA4\x03\x02\x02\x02\xA6\xA7\x03\x02\x02\x02\xA7\xA5" +
		"\x03\x02\x02\x02\xA7\xA8\x03\x02\x02\x02\xA84\x03\x02\x02\x02\t\x028?" +
		"MXt\xA7\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ANTLRFollowLexer.__ATN) {
			ANTLRFollowLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ANTLRFollowLexer._serializedATN));
		}

		return ANTLRFollowLexer.__ATN;
	}

}

