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
	public static readonly LINE_COMMENT = 3;
	public static readonly BLOCK_COMMENT = 4;
	public static readonly LBRACE = 5;
	public static readonly RBRACE = 6;
	public static readonly LBRACKET = 7;
	public static readonly RBRACKET = 8;
	public static readonly LPAREN = 9;
	public static readonly RPAREN = 10;
	public static readonly EQ = 11;
	public static readonly COMMA = 12;
	public static readonly KW_TYPE = 13;
	public static readonly KW_CONST = 14;
	public static readonly KW_VAR = 15;
	public static readonly KW_PROP = 16;
	public static readonly KW_AXIOM = 17;
	public static readonly KW_THEOREM = 18;
	public static readonly KW_ASSUME = 19;
	public static readonly KW_TARGET = 20;
	public static readonly ID = 21;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"WS", "NL", "LINE_COMMENT", "BLOCK_COMMENT", "LBRACE", "RBRACE", "LBRACKET", 
		"RBRACKET", "LPAREN", "RPAREN", "EQ", "COMMA", "KW_TYPE", "KW_CONST", 
		"KW_VAR", "KW_PROP", "KW_AXIOM", "KW_THEOREM", "KW_ASSUME", "KW_TARGET", 
		"ID",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, "'{'", "'}'", "'['", 
		"']'", "'('", "')'", "'='", "','", "'type'", "'const'", "'var'", "'prop'", 
		"'axiom'", "'thm'", "'-|'", "'|-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "WS", "NL", "LINE_COMMENT", "BLOCK_COMMENT", "LBRACE", "RBRACE", 
		"LBRACKET", "RBRACKET", "LPAREN", "RPAREN", "EQ", "COMMA", "KW_TYPE", 
		"KW_CONST", "KW_VAR", "KW_PROP", "KW_AXIOM", "KW_THEOREM", "KW_ASSUME", 
		"KW_TARGET", "ID",
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x17\x8F\b\x01" +
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x03\x02\x06" +
		"\x02/\n\x02\r\x02\x0E\x020\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x05" +
		"\x038\n\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x07\x04@\n" +
		"\x04\f\x04\x0E\x04C\v\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x07\x05M\n\x05\f\x05\x0E\x05P\v\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03" +
		"\t\x03\t\x03\n\x03\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E" +
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F" +
		"\x03\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
		"\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13" +
		"\x03\x13\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x16\x06\x16" +
		"\x8C\n\x16\r\x16\x0E\x16\x8D\x03N\x02\x02\x17\x03\x02\x03\x05\x02\x04" +
		"\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v" +
		"\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02\x11!" +
		"\x02\x12#\x02\x13%\x02\x14\'\x02\x15)\x02\x16+\x02\x17\x03\x02\x06\x04" +
		"\x02\v\v\"\"\x04\x02\f\f\x0F\x0F\x03\x02\f\f\x07\x02/02;C\\aac|\x02\x93" +
		"\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02" +
		"\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02" +
		"\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02" +
		"\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02" +
		"\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02" +
		"!\x03\x02\x02\x02\x02#\x03\x02\x02\x02\x02%\x03\x02\x02\x02\x02\'\x03" +
		"\x02\x02\x02\x02)\x03\x02\x02\x02\x02+\x03\x02\x02\x02\x03.\x03\x02\x02" +
		"\x02\x057\x03\x02\x02\x02\x07;\x03\x02\x02\x02\tH\x03\x02\x02\x02\vV\x03" +
		"\x02\x02\x02\rX\x03\x02\x02\x02\x0FZ\x03\x02\x02\x02\x11\\\x03\x02\x02" +
		"\x02\x13^\x03\x02\x02\x02\x15`\x03\x02\x02\x02\x17b\x03\x02\x02\x02\x19" +
		"d\x03\x02\x02\x02\x1Bf\x03\x02\x02\x02\x1Dk\x03\x02\x02\x02\x1Fq\x03\x02" +
		"\x02\x02!u\x03\x02\x02\x02#z\x03\x02\x02\x02%\x80\x03\x02\x02\x02\'\x84" +
		"\x03\x02\x02\x02)\x87\x03\x02\x02\x02+\x8B\x03\x02\x02\x02-/\t\x02\x02" +
		"\x02.-\x03\x02\x02\x02/0\x03\x02\x02\x020.\x03\x02\x02\x0201\x03\x02\x02" +
		"\x0212\x03\x02\x02\x0223\b\x02\x02\x023\x04\x03\x02\x02\x0245\x07\x0F" +
		"\x02\x0258\x07\f\x02\x0268\t\x03\x02\x0274\x03\x02\x02\x0276\x03\x02\x02" +
		"\x0289\x03\x02\x02\x029:\b\x03\x02\x02:\x06\x03\x02\x02\x02;<\x071\x02" +
		"\x02<=\x071\x02\x02=A\x03\x02\x02\x02>@\n\x04\x02\x02?>\x03\x02\x02\x02" +
		"@C\x03\x02\x02\x02A?\x03\x02\x02\x02AB\x03\x02\x02\x02BD\x03\x02\x02\x02" +
		"CA\x03\x02\x02\x02DE\x07\f\x02\x02EF\x03\x02\x02\x02FG\b\x04\x03\x02G" +
		"\b\x03\x02\x02\x02HI\x071\x02\x02IJ\x07,\x02\x02JN\x03\x02\x02\x02KM\v" +
		"\x02\x02\x02LK\x03\x02\x02\x02MP\x03\x02\x02\x02NO\x03\x02\x02\x02NL\x03" +
		"\x02\x02\x02OQ\x03\x02\x02\x02PN\x03\x02\x02\x02QR\x07,\x02\x02RS\x07" +
		"1\x02\x02ST\x03\x02\x02\x02TU\b\x05\x03\x02U\n\x03\x02\x02\x02VW\x07}" +
		"\x02\x02W\f\x03\x02\x02\x02XY\x07\x7F\x02\x02Y\x0E\x03\x02\x02\x02Z[\x07" +
		"]\x02\x02[\x10\x03\x02\x02\x02\\]\x07_\x02\x02]\x12\x03\x02\x02\x02^_" +
		"\x07*\x02\x02_\x14\x03\x02\x02\x02`a\x07+\x02\x02a\x16\x03\x02\x02\x02" +
		"bc\x07?\x02\x02c\x18\x03\x02\x02\x02de\x07.\x02\x02e\x1A\x03\x02\x02\x02" +
		"fg\x07v\x02\x02gh\x07{\x02\x02hi\x07r\x02\x02ij\x07g\x02\x02j\x1C\x03" +
		"\x02\x02\x02kl\x07e\x02\x02lm\x07q\x02\x02mn\x07p\x02\x02no\x07u\x02\x02" +
		"op\x07v\x02\x02p\x1E\x03\x02\x02\x02qr\x07x\x02\x02rs\x07c\x02\x02st\x07" +
		"t\x02\x02t \x03\x02\x02\x02uv\x07r\x02\x02vw\x07t\x02\x02wx\x07q\x02\x02" +
		"xy\x07r\x02\x02y\"\x03\x02\x02\x02z{\x07c\x02\x02{|\x07z\x02\x02|}\x07" +
		"k\x02\x02}~\x07q\x02\x02~\x7F\x07o\x02\x02\x7F$\x03\x02\x02\x02\x80\x81" +
		"\x07v\x02\x02\x81\x82\x07j\x02\x02\x82\x83\x07o\x02\x02\x83&\x03\x02\x02" +
		"\x02\x84\x85\x07/\x02\x02\x85\x86\x07~\x02\x02\x86(\x03\x02\x02\x02\x87" +
		"\x88\x07~\x02\x02\x88\x89\x07/\x02\x02\x89*\x03\x02\x02\x02\x8A\x8C\t" +
		"\x05\x02\x02\x8B\x8A\x03\x02\x02\x02\x8C\x8D\x03\x02\x02\x02\x8D\x8B\x03" +
		"\x02\x02\x02\x8D\x8E\x03\x02\x02\x02\x8E,\x03\x02\x02\x02\b\x0207AN\x8D" +
		"\x04\b\x02\x02\x02\x03\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ANTLRFollowLexer.__ATN) {
			ANTLRFollowLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ANTLRFollowLexer._serializedATN));
		}

		return ANTLRFollowLexer.__ATN;
	}

}
