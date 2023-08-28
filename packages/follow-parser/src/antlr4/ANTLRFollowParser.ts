// Generated from ./antlr4/ANTLRFollowParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ANTLRFollowParserListener } from "./ANTLRFollowParserListener";

export class ANTLRFollowParser extends Parser {
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
	public static readonly RULE_root = 0;
	public static readonly RULE_importBlocks = 1;
	public static readonly RULE_importBlock = 2;
	public static readonly RULE_typeBlock = 3;
	public static readonly RULE_constBlock = 4;
	public static readonly RULE_varBlock = 5;
	public static readonly RULE_propBlock = 6;
	public static readonly RULE_axiomBlock = 7;
	public static readonly RULE_theoremBlock = 8;
	public static readonly RULE_lineCommentBlock = 9;
	public static readonly RULE_blockCommentBlock = 10;
	public static readonly RULE_paramBlockNonEmpty = 11;
	public static readonly RULE_paramBlock = 12;
	public static readonly RULE_paramPair = 13;
	public static readonly RULE_assumeBlock = 14;
	public static readonly RULE_targetBlock = 15;
	public static readonly RULE_contentBlock = 16;
	public static readonly RULE_proofBlock = 17;
	public static readonly RULE_typeDef = 18;
	public static readonly RULE_typeID = 19;
	public static readonly RULE_constID = 20;
	public static readonly RULE_varID = 21;
	public static readonly RULE_propID = 22;
	public static readonly RULE_axiomID = 23;
	public static readonly RULE_theoremID = 24;
	public static readonly RULE_argID = 25;
	public static readonly RULE_assumeID = 26;
	public static readonly RULE_targetID = 27;
	public static readonly RULE_proofID = 28;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"root", "importBlocks", "importBlock", "typeBlock", "constBlock", "varBlock", 
		"propBlock", "axiomBlock", "theoremBlock", "lineCommentBlock", "blockCommentBlock", 
		"paramBlockNonEmpty", "paramBlock", "paramPair", "assumeBlock", "targetBlock", 
		"contentBlock", "proofBlock", "typeDef", "typeID", "constID", "varID", 
		"propID", "axiomID", "theoremID", "argID", "assumeID", "targetID", "proofID",
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
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ANTLRFollowParser._LITERAL_NAMES, ANTLRFollowParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ANTLRFollowParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ANTLRFollowParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return ANTLRFollowParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ANTLRFollowParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ANTLRFollowParser._ATN, this);
	}
	// @RuleVersion(0)
	public root(): RootContext {
		let _localctx: RootContext = new RootContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ANTLRFollowParser.RULE_root);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 59;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ANTLRFollowParser.KW_IMPORT) {
				{
				this.state = 58;
				this.importBlocks();
				}
			}

			this.state = 71;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ANTLRFollowParser.LINE_COMMENT) | (1 << ANTLRFollowParser.BLOCK_COMMENT) | (1 << ANTLRFollowParser.KW_TYPE) | (1 << ANTLRFollowParser.KW_CONST) | (1 << ANTLRFollowParser.KW_VAR) | (1 << ANTLRFollowParser.KW_PROP) | (1 << ANTLRFollowParser.KW_AXIOM) | (1 << ANTLRFollowParser.KW_THEOREM))) !== 0)) {
				{
				this.state = 69;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ANTLRFollowParser.KW_TYPE:
					{
					this.state = 61;
					this.typeBlock();
					}
					break;
				case ANTLRFollowParser.KW_CONST:
					{
					this.state = 62;
					this.constBlock();
					}
					break;
				case ANTLRFollowParser.KW_VAR:
					{
					this.state = 63;
					this.varBlock();
					}
					break;
				case ANTLRFollowParser.KW_PROP:
					{
					this.state = 64;
					this.propBlock();
					}
					break;
				case ANTLRFollowParser.KW_AXIOM:
					{
					this.state = 65;
					this.axiomBlock();
					}
					break;
				case ANTLRFollowParser.KW_THEOREM:
					{
					this.state = 66;
					this.theoremBlock();
					}
					break;
				case ANTLRFollowParser.LINE_COMMENT:
					{
					this.state = 67;
					this.lineCommentBlock();
					}
					break;
				case ANTLRFollowParser.BLOCK_COMMENT:
					{
					this.state = 68;
					this.blockCommentBlock();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 73;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 74;
			this.match(ANTLRFollowParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public importBlocks(): ImportBlocksContext {
		let _localctx: ImportBlocksContext = new ImportBlocksContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ANTLRFollowParser.RULE_importBlocks);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 77;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 76;
				this.importBlock();
				}
				}
				this.state = 79;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === ANTLRFollowParser.KW_IMPORT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public importBlock(): ImportBlockContext {
		let _localctx: ImportBlockContext = new ImportBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ANTLRFollowParser.RULE_importBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 81;
			this.match(ANTLRFollowParser.KW_IMPORT);
			this.state = 82;
			this.match(ANTLRFollowParser.STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeBlock(): TypeBlockContext {
		let _localctx: TypeBlockContext = new TypeBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ANTLRFollowParser.RULE_typeBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 84;
			this.match(ANTLRFollowParser.KW_TYPE);
			this.state = 86;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 85;
				this.typeDef();
				}
				}
				this.state = 88;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constBlock(): ConstBlockContext {
		let _localctx: ConstBlockContext = new ConstBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ANTLRFollowParser.RULE_constBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 90;
			this.match(ANTLRFollowParser.KW_CONST);
			this.state = 91;
			this.typeID();
			this.state = 93;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 92;
				this.constID();
				}
				}
				this.state = 95;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varBlock(): VarBlockContext {
		let _localctx: VarBlockContext = new VarBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ANTLRFollowParser.RULE_varBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 97;
			this.match(ANTLRFollowParser.KW_VAR);
			this.state = 98;
			this.typeID();
			this.state = 100;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 99;
				this.varID();
				}
				}
				this.state = 102;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public propBlock(): PropBlockContext {
		let _localctx: PropBlockContext = new PropBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ANTLRFollowParser.RULE_propBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 104;
			this.match(ANTLRFollowParser.KW_PROP);
			this.state = 105;
			this.typeID();
			this.state = 106;
			this.propID();
			this.state = 107;
			this.paramBlockNonEmpty();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public axiomBlock(): AxiomBlockContext {
		let _localctx: AxiomBlockContext = new AxiomBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ANTLRFollowParser.RULE_axiomBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 109;
			this.match(ANTLRFollowParser.KW_AXIOM);
			this.state = 110;
			this.axiomID();
			this.state = 111;
			this.paramBlock();
			this.state = 112;
			this.contentBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public theoremBlock(): TheoremBlockContext {
		let _localctx: TheoremBlockContext = new TheoremBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ANTLRFollowParser.RULE_theoremBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 114;
			this.match(ANTLRFollowParser.KW_THEOREM);
			this.state = 115;
			this.theoremID();
			this.state = 116;
			this.paramBlock();
			this.state = 117;
			this.contentBlock();
			this.state = 118;
			this.match(ANTLRFollowParser.EQ);
			this.state = 119;
			this.proofBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lineCommentBlock(): LineCommentBlockContext {
		let _localctx: LineCommentBlockContext = new LineCommentBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ANTLRFollowParser.RULE_lineCommentBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 121;
			this.match(ANTLRFollowParser.LINE_COMMENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public blockCommentBlock(): BlockCommentBlockContext {
		let _localctx: BlockCommentBlockContext = new BlockCommentBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ANTLRFollowParser.RULE_blockCommentBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 123;
			this.match(ANTLRFollowParser.BLOCK_COMMENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paramBlockNonEmpty(): ParamBlockNonEmptyContext {
		let _localctx: ParamBlockNonEmptyContext = new ParamBlockNonEmptyContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ANTLRFollowParser.RULE_paramBlockNonEmpty);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 125;
			this.match(ANTLRFollowParser.LPAREN);
			this.state = 126;
			this.paramPair();
			this.state = 131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ANTLRFollowParser.COMMA) {
				{
				{
				this.state = 127;
				this.match(ANTLRFollowParser.COMMA);
				this.state = 128;
				this.paramPair();
				}
				}
				this.state = 133;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 134;
			this.match(ANTLRFollowParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paramBlock(): ParamBlockContext {
		let _localctx: ParamBlockContext = new ParamBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ANTLRFollowParser.RULE_paramBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 136;
			this.match(ANTLRFollowParser.LPAREN);
			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ANTLRFollowParser.ID) {
				{
				this.state = 137;
				this.paramPair();
				this.state = 142;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ANTLRFollowParser.COMMA) {
					{
					{
					this.state = 138;
					this.match(ANTLRFollowParser.COMMA);
					this.state = 139;
					this.paramPair();
					}
					}
					this.state = 144;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 147;
			this.match(ANTLRFollowParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paramPair(): ParamPairContext {
		let _localctx: ParamPairContext = new ParamPairContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ANTLRFollowParser.RULE_paramPair);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.typeID();
			this.state = 150;
			this.argID();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assumeBlock(): AssumeBlockContext {
		let _localctx: AssumeBlockContext = new AssumeBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ANTLRFollowParser.RULE_assumeBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 152;
			this.match(ANTLRFollowParser.KW_ASSUME);
			this.state = 154;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 153;
				this.assumeID();
				}
				}
				this.state = 156;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ANTLRFollowParser.LPAREN) | (1 << ANTLRFollowParser.RPAREN) | (1 << ANTLRFollowParser.ID))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public targetBlock(): TargetBlockContext {
		let _localctx: TargetBlockContext = new TargetBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ANTLRFollowParser.RULE_targetBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 158;
			this.match(ANTLRFollowParser.KW_TARGET);
			this.state = 160;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 159;
				this.targetID();
				}
				}
				this.state = 162;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ANTLRFollowParser.LPAREN) | (1 << ANTLRFollowParser.RPAREN) | (1 << ANTLRFollowParser.ID))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contentBlock(): ContentBlockContext {
		let _localctx: ContentBlockContext = new ContentBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, ANTLRFollowParser.RULE_contentBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 164;
			this.match(ANTLRFollowParser.LBRACE);
			this.state = 168;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ANTLRFollowParser.KW_ASSUME) {
				{
				{
				this.state = 165;
				this.assumeBlock();
				}
				}
				this.state = 170;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 171;
			this.targetBlock();
			this.state = 172;
			this.match(ANTLRFollowParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public proofBlock(): ProofBlockContext {
		let _localctx: ProofBlockContext = new ProofBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, ANTLRFollowParser.RULE_proofBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 174;
			this.match(ANTLRFollowParser.LBRACE);
			this.state = 178;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ANTLRFollowParser.LPAREN) | (1 << ANTLRFollowParser.RPAREN) | (1 << ANTLRFollowParser.ID))) !== 0)) {
				{
				{
				this.state = 175;
				this.proofID();
				}
				}
				this.state = 180;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 181;
			this.match(ANTLRFollowParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeDef(): TypeDefContext {
		let _localctx: TypeDefContext = new TypeDefContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, ANTLRFollowParser.RULE_typeDef);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 183;
			this.match(ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeID(): TypeIDContext {
		let _localctx: TypeIDContext = new TypeIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ANTLRFollowParser.RULE_typeID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 185;
			this.match(ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constID(): ConstIDContext {
		let _localctx: ConstIDContext = new ConstIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, ANTLRFollowParser.RULE_constID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 187;
			this.match(ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varID(): VarIDContext {
		let _localctx: VarIDContext = new VarIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, ANTLRFollowParser.RULE_varID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 189;
			this.match(ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public propID(): PropIDContext {
		let _localctx: PropIDContext = new PropIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, ANTLRFollowParser.RULE_propID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 191;
			this.match(ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public axiomID(): AxiomIDContext {
		let _localctx: AxiomIDContext = new AxiomIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, ANTLRFollowParser.RULE_axiomID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 193;
			this.match(ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public theoremID(): TheoremIDContext {
		let _localctx: TheoremIDContext = new TheoremIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, ANTLRFollowParser.RULE_theoremID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 195;
			this.match(ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public argID(): ArgIDContext {
		let _localctx: ArgIDContext = new ArgIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, ANTLRFollowParser.RULE_argID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 197;
			this.match(ANTLRFollowParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assumeID(): AssumeIDContext {
		let _localctx: AssumeIDContext = new AssumeIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, ANTLRFollowParser.RULE_assumeID);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 199;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ANTLRFollowParser.LPAREN) | (1 << ANTLRFollowParser.RPAREN) | (1 << ANTLRFollowParser.ID))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public targetID(): TargetIDContext {
		let _localctx: TargetIDContext = new TargetIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, ANTLRFollowParser.RULE_targetID);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 201;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ANTLRFollowParser.LPAREN) | (1 << ANTLRFollowParser.RPAREN) | (1 << ANTLRFollowParser.ID))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public proofID(): ProofIDContext {
		let _localctx: ProofIDContext = new ProofIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, ANTLRFollowParser.RULE_proofID);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 203;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ANTLRFollowParser.LPAREN) | (1 << ANTLRFollowParser.RPAREN) | (1 << ANTLRFollowParser.ID))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1B\xD0\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x03\x02\x05\x02>\n\x02\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x07\x02H\n\x02\f\x02\x0E\x02" +
		"K\v\x02\x03\x02\x03\x02\x03\x03\x06\x03P\n\x03\r\x03\x0E\x03Q\x03\x04" +
		"\x03\x04\x03\x04\x03\x05\x03\x05\x06\x05Y\n\x05\r\x05\x0E\x05Z\x03\x06" +
		"\x03\x06\x03\x06\x06\x06`\n\x06\r\x06\x0E\x06a\x03\x07\x03\x07\x03\x07" +
		"\x06\x07g\n\x07\r\x07\x0E\x07h\x03\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03" +
		"\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\v\x03" +
		"\v\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x07\r\x84\n\r\f\r\x0E\r\x87\v\r" +
		"\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x07\x0E\x8F\n\x0E\f\x0E\x0E" +
		"\x0E\x92\v\x0E\x05\x0E\x94\n\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F" +
		"\x03\x10\x03\x10\x06\x10\x9D\n\x10\r\x10\x0E\x10\x9E\x03\x11\x03\x11\x06" +
		"\x11\xA3\n\x11\r\x11\x0E\x11\xA4\x03\x12\x03\x12\x07\x12\xA9\n\x12\f\x12" +
		"\x0E\x12\xAC\v\x12\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x07\x13\xB3" +
		"\n\x13\f\x13\x0E\x13\xB6\v\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x15" +
		"\x03\x15\x03\x16\x03\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x19\x03\x19" +
		"\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1E" +
		"\x03\x1E\x03\x1E\x02\x02\x02\x1F\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f" +
		"\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E" +
		"\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02" +
		":\x02\x02\x03\x04\x02\f\r\x1B\x1B\x02\xC6\x02=\x03\x02\x02\x02\x04O\x03" +
		"\x02\x02\x02\x06S\x03\x02\x02\x02\bV\x03\x02\x02\x02\n\\\x03\x02\x02\x02" +
		"\fc\x03\x02\x02\x02\x0Ej\x03\x02\x02\x02\x10o\x03\x02\x02\x02\x12t\x03" +
		"\x02\x02\x02\x14{\x03\x02\x02\x02\x16}\x03\x02\x02\x02\x18\x7F\x03\x02" +
		"\x02\x02\x1A\x8A\x03\x02\x02\x02\x1C\x97\x03\x02\x02\x02\x1E\x9A\x03\x02" +
		"\x02\x02 \xA0\x03\x02\x02\x02\"\xA6\x03\x02\x02\x02$\xB0\x03\x02\x02\x02" +
		"&\xB9\x03\x02\x02\x02(\xBB\x03\x02\x02\x02*\xBD\x03\x02\x02\x02,\xBF\x03" +
		"\x02\x02\x02.\xC1\x03\x02\x02\x020\xC3\x03\x02\x02\x022\xC5\x03\x02\x02" +
		"\x024\xC7\x03\x02\x02\x026\xC9\x03\x02\x02\x028\xCB\x03\x02\x02\x02:\xCD" +
		"\x03\x02\x02\x02<>\x05\x04\x03\x02=<\x03\x02\x02\x02=>\x03\x02\x02\x02" +
		">I\x03\x02\x02\x02?H\x05\b\x05\x02@H\x05\n\x06\x02AH\x05\f\x07\x02BH\x05" +
		"\x0E\b\x02CH\x05\x10\t\x02DH\x05\x12\n\x02EH\x05\x14\v\x02FH\x05\x16\f" +
		"\x02G?\x03\x02\x02\x02G@\x03\x02\x02\x02GA\x03\x02\x02\x02GB\x03\x02\x02" +
		"\x02GC\x03\x02\x02\x02GD\x03\x02\x02\x02GE\x03\x02\x02\x02GF\x03\x02\x02" +
		"\x02HK\x03\x02\x02\x02IG\x03\x02\x02\x02IJ\x03\x02\x02\x02JL\x03\x02\x02" +
		"\x02KI\x03\x02\x02\x02LM\x07\x02\x02\x03M\x03\x03\x02\x02\x02NP\x05\x06" +
		"\x04\x02ON\x03\x02\x02\x02PQ\x03\x02\x02\x02QO\x03\x02\x02\x02QR\x03\x02" +
		"\x02\x02R\x05\x03\x02\x02\x02ST\x07\x12\x02\x02TU\x07\x11\x02\x02U\x07" +
		"\x03\x02\x02\x02VX\x07\x13\x02\x02WY\x05&\x14\x02XW\x03\x02\x02\x02YZ" +
		"\x03\x02\x02\x02ZX\x03\x02\x02\x02Z[\x03\x02\x02\x02[\t\x03\x02\x02\x02" +
		"\\]\x07\x14\x02\x02]_\x05(\x15\x02^`\x05*\x16\x02_^\x03\x02\x02\x02`a" +
		"\x03\x02\x02\x02a_\x03\x02\x02\x02ab\x03\x02\x02\x02b\v\x03\x02\x02\x02" +
		"cd\x07\x15\x02\x02df\x05(\x15\x02eg\x05,\x17\x02fe\x03\x02\x02\x02gh\x03" +
		"\x02\x02\x02hf\x03\x02\x02\x02hi\x03\x02\x02\x02i\r\x03\x02\x02\x02jk" +
		"\x07\x16\x02\x02kl\x05(\x15\x02lm\x05.\x18\x02mn\x05\x18\r\x02n\x0F\x03" +
		"\x02\x02\x02op\x07\x17\x02\x02pq\x050\x19\x02qr\x05\x1A\x0E\x02rs\x05" +
		"\"\x12\x02s\x11\x03\x02\x02\x02tu\x07\x18\x02\x02uv\x052\x1A\x02vw\x05" +
		"\x1A\x0E\x02wx\x05\"\x12\x02xy\x07\x0E\x02\x02yz\x05$\x13\x02z\x13\x03" +
		"\x02\x02\x02{|\x07\x06\x02\x02|\x15\x03\x02\x02\x02}~\x07\x07\x02\x02" +
		"~\x17\x03\x02\x02\x02\x7F\x80\x07\f\x02\x02\x80\x85\x05\x1C\x0F\x02\x81" +
		"\x82\x07\x0F\x02\x02\x82\x84\x05\x1C\x0F\x02\x83\x81\x03\x02\x02\x02\x84" +
		"\x87\x03\x02\x02\x02\x85\x83\x03\x02\x02\x02\x85\x86\x03\x02\x02\x02\x86" +
		"\x88\x03\x02\x02\x02\x87\x85\x03\x02\x02\x02\x88\x89\x07\r\x02\x02\x89" +
		"\x19\x03\x02\x02\x02\x8A\x93\x07\f\x02\x02\x8B\x90\x05\x1C\x0F\x02\x8C" +
		"\x8D\x07\x0F\x02\x02\x8D\x8F\x05\x1C\x0F\x02\x8E\x8C\x03\x02\x02\x02\x8F" +
		"\x92\x03\x02\x02\x02\x90\x8E\x03\x02\x02\x02\x90\x91\x03\x02\x02\x02\x91" +
		"\x94\x03\x02\x02\x02\x92\x90\x03\x02\x02\x02\x93\x8B\x03\x02\x02\x02\x93" +
		"\x94\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95\x96\x07\r\x02\x02\x96" +
		"\x1B\x03\x02\x02\x02\x97\x98\x05(\x15\x02\x98\x99\x054\x1B\x02\x99\x1D" +
		"\x03\x02\x02\x02\x9A\x9C\x07\x19\x02\x02\x9B\x9D\x056\x1C\x02\x9C\x9B" +
		"\x03\x02\x02\x02\x9D\x9E\x03\x02\x02\x02\x9E\x9C\x03\x02\x02\x02\x9E\x9F" +
		"\x03\x02\x02\x02\x9F\x1F\x03\x02\x02\x02\xA0\xA2\x07\x1A\x02\x02\xA1\xA3" +
		"\x058\x1D\x02\xA2\xA1\x03\x02\x02\x02\xA3\xA4\x03\x02\x02\x02\xA4\xA2" +
		"\x03\x02\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5!\x03\x02\x02\x02\xA6\xAA" +
		"\x07\b\x02\x02\xA7\xA9\x05\x1E\x10\x02\xA8\xA7\x03\x02\x02\x02\xA9\xAC" +
		"\x03\x02\x02\x02\xAA\xA8\x03\x02\x02\x02\xAA\xAB\x03\x02\x02\x02\xAB\xAD" +
		"\x03\x02\x02\x02\xAC\xAA\x03\x02\x02\x02\xAD\xAE\x05 \x11\x02\xAE\xAF" +
		"\x07\t\x02\x02\xAF#\x03\x02\x02\x02\xB0\xB4\x07\b\x02\x02\xB1\xB3\x05" +
		":\x1E\x02\xB2\xB1\x03\x02\x02\x02\xB3\xB6\x03\x02\x02\x02\xB4\xB2\x03" +
		"\x02\x02\x02\xB4\xB5\x03\x02\x02\x02\xB5\xB7\x03\x02\x02\x02\xB6\xB4\x03" +
		"\x02\x02\x02\xB7\xB8\x07\t\x02\x02\xB8%\x03\x02\x02\x02\xB9\xBA\x07\x1B" +
		"\x02\x02\xBA\'\x03\x02\x02\x02\xBB\xBC\x07\x1B\x02\x02\xBC)\x03\x02\x02" +
		"\x02\xBD\xBE\x07\x1B\x02\x02\xBE+\x03\x02\x02\x02\xBF\xC0\x07\x1B\x02" +
		"\x02\xC0-\x03\x02\x02\x02\xC1\xC2\x07\x1B\x02\x02\xC2/\x03\x02\x02\x02" +
		"\xC3\xC4\x07\x1B\x02\x02\xC41\x03\x02\x02\x02\xC5\xC6\x07\x1B\x02\x02" +
		"\xC63\x03\x02\x02\x02\xC7\xC8\x07\x1B\x02\x02\xC85\x03\x02\x02\x02\xC9" +
		"\xCA\t\x02\x02\x02\xCA7\x03\x02\x02\x02\xCB\xCC\t\x02\x02\x02\xCC9\x03" +
		"\x02\x02\x02\xCD\xCE\t\x02\x02\x02\xCE;\x03\x02\x02\x02\x10=GIQZah\x85" +
		"\x90\x93\x9E\xA4\xAA\xB4";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ANTLRFollowParser.__ATN) {
			ANTLRFollowParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ANTLRFollowParser._serializedATN));
		}

		return ANTLRFollowParser.__ATN;
	}

}

export class RootContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ANTLRFollowParser.EOF, 0); }
	public importBlocks(): ImportBlocksContext | undefined {
		return this.tryGetRuleContext(0, ImportBlocksContext);
	}
	public typeBlock(): TypeBlockContext[];
	public typeBlock(i: number): TypeBlockContext;
	public typeBlock(i?: number): TypeBlockContext | TypeBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeBlockContext);
		} else {
			return this.getRuleContext(i, TypeBlockContext);
		}
	}
	public constBlock(): ConstBlockContext[];
	public constBlock(i: number): ConstBlockContext;
	public constBlock(i?: number): ConstBlockContext | ConstBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConstBlockContext);
		} else {
			return this.getRuleContext(i, ConstBlockContext);
		}
	}
	public varBlock(): VarBlockContext[];
	public varBlock(i: number): VarBlockContext;
	public varBlock(i?: number): VarBlockContext | VarBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VarBlockContext);
		} else {
			return this.getRuleContext(i, VarBlockContext);
		}
	}
	public propBlock(): PropBlockContext[];
	public propBlock(i: number): PropBlockContext;
	public propBlock(i?: number): PropBlockContext | PropBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PropBlockContext);
		} else {
			return this.getRuleContext(i, PropBlockContext);
		}
	}
	public axiomBlock(): AxiomBlockContext[];
	public axiomBlock(i: number): AxiomBlockContext;
	public axiomBlock(i?: number): AxiomBlockContext | AxiomBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AxiomBlockContext);
		} else {
			return this.getRuleContext(i, AxiomBlockContext);
		}
	}
	public theoremBlock(): TheoremBlockContext[];
	public theoremBlock(i: number): TheoremBlockContext;
	public theoremBlock(i?: number): TheoremBlockContext | TheoremBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TheoremBlockContext);
		} else {
			return this.getRuleContext(i, TheoremBlockContext);
		}
	}
	public lineCommentBlock(): LineCommentBlockContext[];
	public lineCommentBlock(i: number): LineCommentBlockContext;
	public lineCommentBlock(i?: number): LineCommentBlockContext | LineCommentBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LineCommentBlockContext);
		} else {
			return this.getRuleContext(i, LineCommentBlockContext);
		}
	}
	public blockCommentBlock(): BlockCommentBlockContext[];
	public blockCommentBlock(i: number): BlockCommentBlockContext;
	public blockCommentBlock(i?: number): BlockCommentBlockContext | BlockCommentBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BlockCommentBlockContext);
		} else {
			return this.getRuleContext(i, BlockCommentBlockContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_root; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterRoot) {
			listener.enterRoot(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitRoot) {
			listener.exitRoot(this);
		}
	}
}


export class ImportBlocksContext extends ParserRuleContext {
	public importBlock(): ImportBlockContext[];
	public importBlock(i: number): ImportBlockContext;
	public importBlock(i?: number): ImportBlockContext | ImportBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportBlockContext);
		} else {
			return this.getRuleContext(i, ImportBlockContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_importBlocks; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterImportBlocks) {
			listener.enterImportBlocks(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitImportBlocks) {
			listener.exitImportBlocks(this);
		}
	}
}


export class ImportBlockContext extends ParserRuleContext {
	public KW_IMPORT(): TerminalNode { return this.getToken(ANTLRFollowParser.KW_IMPORT, 0); }
	public STRING(): TerminalNode { return this.getToken(ANTLRFollowParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_importBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterImportBlock) {
			listener.enterImportBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitImportBlock) {
			listener.exitImportBlock(this);
		}
	}
}


export class TypeBlockContext extends ParserRuleContext {
	public KW_TYPE(): TerminalNode { return this.getToken(ANTLRFollowParser.KW_TYPE, 0); }
	public typeDef(): TypeDefContext[];
	public typeDef(i: number): TypeDefContext;
	public typeDef(i?: number): TypeDefContext | TypeDefContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeDefContext);
		} else {
			return this.getRuleContext(i, TypeDefContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_typeBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterTypeBlock) {
			listener.enterTypeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitTypeBlock) {
			listener.exitTypeBlock(this);
		}
	}
}


export class ConstBlockContext extends ParserRuleContext {
	public KW_CONST(): TerminalNode { return this.getToken(ANTLRFollowParser.KW_CONST, 0); }
	public typeID(): TypeIDContext {
		return this.getRuleContext(0, TypeIDContext);
	}
	public constID(): ConstIDContext[];
	public constID(i: number): ConstIDContext;
	public constID(i?: number): ConstIDContext | ConstIDContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConstIDContext);
		} else {
			return this.getRuleContext(i, ConstIDContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_constBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterConstBlock) {
			listener.enterConstBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitConstBlock) {
			listener.exitConstBlock(this);
		}
	}
}


export class VarBlockContext extends ParserRuleContext {
	public KW_VAR(): TerminalNode { return this.getToken(ANTLRFollowParser.KW_VAR, 0); }
	public typeID(): TypeIDContext {
		return this.getRuleContext(0, TypeIDContext);
	}
	public varID(): VarIDContext[];
	public varID(i: number): VarIDContext;
	public varID(i?: number): VarIDContext | VarIDContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VarIDContext);
		} else {
			return this.getRuleContext(i, VarIDContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_varBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterVarBlock) {
			listener.enterVarBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitVarBlock) {
			listener.exitVarBlock(this);
		}
	}
}


export class PropBlockContext extends ParserRuleContext {
	public KW_PROP(): TerminalNode { return this.getToken(ANTLRFollowParser.KW_PROP, 0); }
	public typeID(): TypeIDContext {
		return this.getRuleContext(0, TypeIDContext);
	}
	public propID(): PropIDContext {
		return this.getRuleContext(0, PropIDContext);
	}
	public paramBlockNonEmpty(): ParamBlockNonEmptyContext {
		return this.getRuleContext(0, ParamBlockNonEmptyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_propBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterPropBlock) {
			listener.enterPropBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitPropBlock) {
			listener.exitPropBlock(this);
		}
	}
}


export class AxiomBlockContext extends ParserRuleContext {
	public KW_AXIOM(): TerminalNode { return this.getToken(ANTLRFollowParser.KW_AXIOM, 0); }
	public axiomID(): AxiomIDContext {
		return this.getRuleContext(0, AxiomIDContext);
	}
	public paramBlock(): ParamBlockContext {
		return this.getRuleContext(0, ParamBlockContext);
	}
	public contentBlock(): ContentBlockContext {
		return this.getRuleContext(0, ContentBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_axiomBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterAxiomBlock) {
			listener.enterAxiomBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitAxiomBlock) {
			listener.exitAxiomBlock(this);
		}
	}
}


export class TheoremBlockContext extends ParserRuleContext {
	public KW_THEOREM(): TerminalNode { return this.getToken(ANTLRFollowParser.KW_THEOREM, 0); }
	public theoremID(): TheoremIDContext {
		return this.getRuleContext(0, TheoremIDContext);
	}
	public paramBlock(): ParamBlockContext {
		return this.getRuleContext(0, ParamBlockContext);
	}
	public contentBlock(): ContentBlockContext {
		return this.getRuleContext(0, ContentBlockContext);
	}
	public EQ(): TerminalNode { return this.getToken(ANTLRFollowParser.EQ, 0); }
	public proofBlock(): ProofBlockContext {
		return this.getRuleContext(0, ProofBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_theoremBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterTheoremBlock) {
			listener.enterTheoremBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitTheoremBlock) {
			listener.exitTheoremBlock(this);
		}
	}
}


export class LineCommentBlockContext extends ParserRuleContext {
	public LINE_COMMENT(): TerminalNode { return this.getToken(ANTLRFollowParser.LINE_COMMENT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_lineCommentBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterLineCommentBlock) {
			listener.enterLineCommentBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitLineCommentBlock) {
			listener.exitLineCommentBlock(this);
		}
	}
}


export class BlockCommentBlockContext extends ParserRuleContext {
	public BLOCK_COMMENT(): TerminalNode { return this.getToken(ANTLRFollowParser.BLOCK_COMMENT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_blockCommentBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterBlockCommentBlock) {
			listener.enterBlockCommentBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitBlockCommentBlock) {
			listener.exitBlockCommentBlock(this);
		}
	}
}


export class ParamBlockNonEmptyContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ANTLRFollowParser.LPAREN, 0); }
	public paramPair(): ParamPairContext[];
	public paramPair(i: number): ParamPairContext;
	public paramPair(i?: number): ParamPairContext | ParamPairContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamPairContext);
		} else {
			return this.getRuleContext(i, ParamPairContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(ANTLRFollowParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ANTLRFollowParser.COMMA);
		} else {
			return this.getToken(ANTLRFollowParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_paramBlockNonEmpty; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterParamBlockNonEmpty) {
			listener.enterParamBlockNonEmpty(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitParamBlockNonEmpty) {
			listener.exitParamBlockNonEmpty(this);
		}
	}
}


export class ParamBlockContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ANTLRFollowParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ANTLRFollowParser.RPAREN, 0); }
	public paramPair(): ParamPairContext[];
	public paramPair(i: number): ParamPairContext;
	public paramPair(i?: number): ParamPairContext | ParamPairContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamPairContext);
		} else {
			return this.getRuleContext(i, ParamPairContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ANTLRFollowParser.COMMA);
		} else {
			return this.getToken(ANTLRFollowParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_paramBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterParamBlock) {
			listener.enterParamBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitParamBlock) {
			listener.exitParamBlock(this);
		}
	}
}


export class ParamPairContext extends ParserRuleContext {
	public typeID(): TypeIDContext {
		return this.getRuleContext(0, TypeIDContext);
	}
	public argID(): ArgIDContext {
		return this.getRuleContext(0, ArgIDContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_paramPair; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterParamPair) {
			listener.enterParamPair(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitParamPair) {
			listener.exitParamPair(this);
		}
	}
}


export class AssumeBlockContext extends ParserRuleContext {
	public KW_ASSUME(): TerminalNode { return this.getToken(ANTLRFollowParser.KW_ASSUME, 0); }
	public assumeID(): AssumeIDContext[];
	public assumeID(i: number): AssumeIDContext;
	public assumeID(i?: number): AssumeIDContext | AssumeIDContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AssumeIDContext);
		} else {
			return this.getRuleContext(i, AssumeIDContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_assumeBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterAssumeBlock) {
			listener.enterAssumeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitAssumeBlock) {
			listener.exitAssumeBlock(this);
		}
	}
}


export class TargetBlockContext extends ParserRuleContext {
	public KW_TARGET(): TerminalNode { return this.getToken(ANTLRFollowParser.KW_TARGET, 0); }
	public targetID(): TargetIDContext[];
	public targetID(i: number): TargetIDContext;
	public targetID(i?: number): TargetIDContext | TargetIDContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TargetIDContext);
		} else {
			return this.getRuleContext(i, TargetIDContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_targetBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterTargetBlock) {
			listener.enterTargetBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitTargetBlock) {
			listener.exitTargetBlock(this);
		}
	}
}


export class ContentBlockContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ANTLRFollowParser.LBRACE, 0); }
	public targetBlock(): TargetBlockContext {
		return this.getRuleContext(0, TargetBlockContext);
	}
	public RBRACE(): TerminalNode { return this.getToken(ANTLRFollowParser.RBRACE, 0); }
	public assumeBlock(): AssumeBlockContext[];
	public assumeBlock(i: number): AssumeBlockContext;
	public assumeBlock(i?: number): AssumeBlockContext | AssumeBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AssumeBlockContext);
		} else {
			return this.getRuleContext(i, AssumeBlockContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_contentBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterContentBlock) {
			listener.enterContentBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitContentBlock) {
			listener.exitContentBlock(this);
		}
	}
}


export class ProofBlockContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ANTLRFollowParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ANTLRFollowParser.RBRACE, 0); }
	public proofID(): ProofIDContext[];
	public proofID(i: number): ProofIDContext;
	public proofID(i?: number): ProofIDContext | ProofIDContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ProofIDContext);
		} else {
			return this.getRuleContext(i, ProofIDContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_proofBlock; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterProofBlock) {
			listener.enterProofBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitProofBlock) {
			listener.exitProofBlock(this);
		}
	}
}


export class TypeDefContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_typeDef; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterTypeDef) {
			listener.enterTypeDef(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitTypeDef) {
			listener.exitTypeDef(this);
		}
	}
}


export class TypeIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_typeID; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterTypeID) {
			listener.enterTypeID(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitTypeID) {
			listener.exitTypeID(this);
		}
	}
}


export class ConstIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_constID; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterConstID) {
			listener.enterConstID(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitConstID) {
			listener.exitConstID(this);
		}
	}
}


export class VarIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_varID; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterVarID) {
			listener.enterVarID(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitVarID) {
			listener.exitVarID(this);
		}
	}
}


export class PropIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_propID; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterPropID) {
			listener.enterPropID(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitPropID) {
			listener.exitPropID(this);
		}
	}
}


export class AxiomIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_axiomID; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterAxiomID) {
			listener.enterAxiomID(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitAxiomID) {
			listener.exitAxiomID(this);
		}
	}
}


export class TheoremIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_theoremID; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterTheoremID) {
			listener.enterTheoremID(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitTheoremID) {
			listener.exitTheoremID(this);
		}
	}
}


export class ArgIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_argID; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterArgID) {
			listener.enterArgID(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitArgID) {
			listener.exitArgID(this);
		}
	}
}


export class AssumeIDContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.ID, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_assumeID; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterAssumeID) {
			listener.enterAssumeID(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitAssumeID) {
			listener.exitAssumeID(this);
		}
	}
}


export class TargetIDContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.ID, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_targetID; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterTargetID) {
			listener.enterTargetID(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitTargetID) {
			listener.exitTargetID(this);
		}
	}
}


export class ProofIDContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.ID, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_proofID; }
	// @Override
	public enterRule(listener: ANTLRFollowParserListener): void {
		if (listener.enterProofID) {
			listener.enterProofID(this);
		}
	}
	// @Override
	public exitRule(listener: ANTLRFollowParserListener): void {
		if (listener.exitProofID) {
			listener.exitProofID(this);
		}
	}
}


