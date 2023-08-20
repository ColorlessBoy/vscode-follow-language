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
	public static readonly RULE_root = 0;
	public static readonly RULE_typeBlock = 1;
	public static readonly RULE_constBlock = 2;
	public static readonly RULE_varBlock = 3;
	public static readonly RULE_propBlock = 4;
	public static readonly RULE_axiomBlock = 5;
	public static readonly RULE_theoremBlock = 6;
	public static readonly RULE_paramBlockNonEmpty = 7;
	public static readonly RULE_paramBlock = 8;
	public static readonly RULE_paramPair = 9;
	public static readonly RULE_assumeBlock = 10;
	public static readonly RULE_targetBlock = 11;
	public static readonly RULE_contentBlock = 12;
	public static readonly RULE_proofBlock = 13;
	public static readonly RULE_typeDef = 14;
	public static readonly RULE_typeID = 15;
	public static readonly RULE_constID = 16;
	public static readonly RULE_varID = 17;
	public static readonly RULE_propID = 18;
	public static readonly RULE_axiomID = 19;
	public static readonly RULE_theoremID = 20;
	public static readonly RULE_argID = 21;
	public static readonly RULE_assumeID = 22;
	public static readonly RULE_targetID = 23;
	public static readonly RULE_proofID = 24;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"root", "typeBlock", "constBlock", "varBlock", "propBlock", "axiomBlock", 
		"theoremBlock", "paramBlockNonEmpty", "paramBlock", "paramPair", "assumeBlock", 
		"targetBlock", "contentBlock", "proofBlock", "typeDef", "typeID", "constID", 
		"varID", "propID", "axiomID", "theoremID", "argID", "assumeID", "targetID", 
		"proofID",
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
			this.state = 58;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ANTLRFollowParser.KW_TYPE) | (1 << ANTLRFollowParser.KW_CONST) | (1 << ANTLRFollowParser.KW_VAR) | (1 << ANTLRFollowParser.KW_PROP) | (1 << ANTLRFollowParser.KW_AXIOM) | (1 << ANTLRFollowParser.KW_THEOREM))) !== 0)) {
				{
				this.state = 56;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ANTLRFollowParser.KW_TYPE:
					{
					this.state = 50;
					this.typeBlock();
					}
					break;
				case ANTLRFollowParser.KW_CONST:
					{
					this.state = 51;
					this.constBlock();
					}
					break;
				case ANTLRFollowParser.KW_VAR:
					{
					this.state = 52;
					this.varBlock();
					}
					break;
				case ANTLRFollowParser.KW_PROP:
					{
					this.state = 53;
					this.propBlock();
					}
					break;
				case ANTLRFollowParser.KW_AXIOM:
					{
					this.state = 54;
					this.axiomBlock();
					}
					break;
				case ANTLRFollowParser.KW_THEOREM:
					{
					this.state = 55;
					this.theoremBlock();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 60;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 61;
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
	public typeBlock(): TypeBlockContext {
		let _localctx: TypeBlockContext = new TypeBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ANTLRFollowParser.RULE_typeBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 63;
			this.match(ANTLRFollowParser.KW_TYPE);
			this.state = 65;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 64;
				this.typeDef();
				}
				}
				this.state = 67;
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
		this.enterRule(_localctx, 4, ANTLRFollowParser.RULE_constBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 69;
			this.match(ANTLRFollowParser.KW_CONST);
			this.state = 70;
			this.typeID();
			this.state = 72;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 71;
				this.constID();
				}
				}
				this.state = 74;
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
		this.enterRule(_localctx, 6, ANTLRFollowParser.RULE_varBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 76;
			this.match(ANTLRFollowParser.KW_VAR);
			this.state = 77;
			this.typeID();
			this.state = 79;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 78;
				this.varID();
				}
				}
				this.state = 81;
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
		this.enterRule(_localctx, 8, ANTLRFollowParser.RULE_propBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 83;
			this.match(ANTLRFollowParser.KW_PROP);
			this.state = 84;
			this.typeID();
			this.state = 85;
			this.propID();
			this.state = 86;
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
		this.enterRule(_localctx, 10, ANTLRFollowParser.RULE_axiomBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 88;
			this.match(ANTLRFollowParser.KW_AXIOM);
			this.state = 89;
			this.axiomID();
			this.state = 90;
			this.paramBlock();
			this.state = 91;
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
		this.enterRule(_localctx, 12, ANTLRFollowParser.RULE_theoremBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 93;
			this.match(ANTLRFollowParser.KW_THEOREM);
			this.state = 94;
			this.theoremID();
			this.state = 95;
			this.paramBlock();
			this.state = 96;
			this.contentBlock();
			this.state = 97;
			this.match(ANTLRFollowParser.EQ);
			this.state = 98;
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
	public paramBlockNonEmpty(): ParamBlockNonEmptyContext {
		let _localctx: ParamBlockNonEmptyContext = new ParamBlockNonEmptyContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ANTLRFollowParser.RULE_paramBlockNonEmpty);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 100;
			this.match(ANTLRFollowParser.LPAREN);
			this.state = 101;
			this.paramPair();
			this.state = 106;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ANTLRFollowParser.COMMA) {
				{
				{
				this.state = 102;
				this.match(ANTLRFollowParser.COMMA);
				this.state = 103;
				this.paramPair();
				}
				}
				this.state = 108;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 109;
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
		this.enterRule(_localctx, 16, ANTLRFollowParser.RULE_paramBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 111;
			this.match(ANTLRFollowParser.LPAREN);
			this.state = 120;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ANTLRFollowParser.ID) {
				{
				this.state = 112;
				this.paramPair();
				this.state = 117;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ANTLRFollowParser.COMMA) {
					{
					{
					this.state = 113;
					this.match(ANTLRFollowParser.COMMA);
					this.state = 114;
					this.paramPair();
					}
					}
					this.state = 119;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 122;
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
		this.enterRule(_localctx, 18, ANTLRFollowParser.RULE_paramPair);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 124;
			this.typeID();
			this.state = 125;
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
		this.enterRule(_localctx, 20, ANTLRFollowParser.RULE_assumeBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 127;
			this.match(ANTLRFollowParser.KW_ASSUME);
			this.state = 129;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 128;
				this.assumeID();
				}
				}
				this.state = 131;
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
	public targetBlock(): TargetBlockContext {
		let _localctx: TargetBlockContext = new TargetBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ANTLRFollowParser.RULE_targetBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 133;
			this.match(ANTLRFollowParser.KW_TARGET);
			this.state = 135;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 134;
				this.targetID();
				}
				}
				this.state = 137;
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
	public contentBlock(): ContentBlockContext {
		let _localctx: ContentBlockContext = new ContentBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ANTLRFollowParser.RULE_contentBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 139;
			this.match(ANTLRFollowParser.LBRACE);
			this.state = 143;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ANTLRFollowParser.KW_ASSUME) {
				{
				{
				this.state = 140;
				this.assumeBlock();
				}
				}
				this.state = 145;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 146;
			this.targetBlock();
			this.state = 147;
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
		this.enterRule(_localctx, 26, ANTLRFollowParser.RULE_proofBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.match(ANTLRFollowParser.LBRACE);
			this.state = 153;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ANTLRFollowParser.ID) {
				{
				{
				this.state = 150;
				this.proofID();
				}
				}
				this.state = 155;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 156;
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
		this.enterRule(_localctx, 28, ANTLRFollowParser.RULE_typeDef);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 158;
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
		this.enterRule(_localctx, 30, ANTLRFollowParser.RULE_typeID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 160;
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
		this.enterRule(_localctx, 32, ANTLRFollowParser.RULE_constID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 162;
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
		this.enterRule(_localctx, 34, ANTLRFollowParser.RULE_varID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 164;
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
		this.enterRule(_localctx, 36, ANTLRFollowParser.RULE_propID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 166;
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
		this.enterRule(_localctx, 38, ANTLRFollowParser.RULE_axiomID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 168;
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
		this.enterRule(_localctx, 40, ANTLRFollowParser.RULE_theoremID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 170;
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
		this.enterRule(_localctx, 42, ANTLRFollowParser.RULE_argID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 172;
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
		this.enterRule(_localctx, 44, ANTLRFollowParser.RULE_assumeID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 174;
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
	public targetID(): TargetIDContext {
		let _localctx: TargetIDContext = new TargetIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, ANTLRFollowParser.RULE_targetID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 176;
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
	public proofID(): ProofIDContext {
		let _localctx: ProofIDContext = new ProofIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, ANTLRFollowParser.RULE_proofID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 178;
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

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x17\xB7\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x03\x02\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x07\x02;\n\x02\f\x02\x0E\x02>\v\x02\x03\x02\x03\x02\x03" +
		"\x03\x03\x03\x06\x03D\n\x03\r\x03\x0E\x03E\x03\x04\x03\x04\x03\x04\x06" +
		"\x04K\n\x04\r\x04\x0E\x04L\x03\x05\x03\x05\x03\x05\x06\x05R\n\x05\r\x05" +
		"\x0E\x05S\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03" +
		"\t\x03\t\x03\t\x07\tk\n\t\f\t\x0E\tn\v\t\x03\t\x03\t\x03\n\x03\n\x03\n" +
		"\x03\n\x07\nv\n\n\f\n\x0E\ny\v\n\x05\n{\n\n\x03\n\x03\n\x03\v\x03\v\x03" +
		"\v\x03\f\x03\f\x06\f\x84\n\f\r\f\x0E\f\x85\x03\r\x03\r\x06\r\x8A\n\r\r" +
		"\r\x0E\r\x8B\x03\x0E\x03\x0E\x07\x0E\x90\n\x0E\f\x0E\x0E\x0E\x93\v\x0E" +
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x07\x0F\x9A\n\x0F\f\x0F\x0E\x0F" +
		"\x9D\v\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03" +
		"\x12\x03\x13\x03\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03" +
		"\x17\x03\x17\x03\x18\x03\x18\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A\x02" +
		"\x02\x02\x1B\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02" +
		"\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02" +
		"&\x02(\x02*\x02,\x02.\x020\x022\x02\x02\x02\x02\xAD\x02<\x03\x02\x02\x02" +
		"\x04A\x03\x02\x02\x02\x06G\x03\x02\x02\x02\bN\x03\x02\x02\x02\nU\x03\x02" +
		"\x02\x02\fZ\x03\x02\x02\x02\x0E_\x03\x02\x02\x02\x10f\x03\x02\x02\x02" +
		"\x12q\x03\x02\x02\x02\x14~\x03\x02\x02\x02\x16\x81\x03\x02\x02\x02\x18" +
		"\x87\x03\x02\x02\x02\x1A\x8D\x03\x02\x02\x02\x1C\x97\x03\x02\x02\x02\x1E" +
		"\xA0\x03\x02\x02\x02 \xA2\x03\x02\x02\x02\"\xA4\x03\x02\x02\x02$\xA6\x03" +
		"\x02\x02\x02&\xA8\x03\x02\x02\x02(\xAA\x03\x02\x02\x02*\xAC\x03\x02\x02" +
		"\x02,\xAE\x03\x02\x02\x02.\xB0\x03\x02\x02\x020\xB2\x03\x02\x02\x022\xB4" +
		"\x03\x02\x02\x024;\x05\x04\x03\x025;\x05\x06\x04\x026;\x05\b\x05\x027" +
		";\x05\n\x06\x028;\x05\f\x07\x029;\x05\x0E\b\x02:4\x03\x02\x02\x02:5\x03" +
		"\x02\x02\x02:6\x03\x02\x02\x02:7\x03\x02\x02\x02:8\x03\x02\x02\x02:9\x03" +
		"\x02\x02\x02;>\x03\x02\x02\x02<:\x03\x02\x02\x02<=\x03\x02\x02\x02=?\x03" +
		"\x02\x02\x02><\x03\x02\x02\x02?@\x07\x02\x02\x03@\x03\x03\x02\x02\x02" +
		"AC\x07\x0F\x02\x02BD\x05\x1E\x10\x02CB\x03\x02\x02\x02DE\x03\x02\x02\x02" +
		"EC\x03\x02\x02\x02EF\x03\x02\x02\x02F\x05\x03\x02\x02\x02GH\x07\x10\x02" +
		"\x02HJ\x05 \x11\x02IK\x05\"\x12\x02JI\x03\x02\x02\x02KL\x03\x02\x02\x02" +
		"LJ\x03\x02\x02\x02LM\x03\x02\x02\x02M\x07\x03\x02\x02\x02NO\x07\x11\x02" +
		"\x02OQ\x05 \x11\x02PR\x05$\x13\x02QP\x03\x02\x02\x02RS\x03\x02\x02\x02" +
		"SQ\x03\x02\x02\x02ST\x03\x02\x02\x02T\t\x03\x02\x02\x02UV\x07\x12\x02" +
		"\x02VW\x05 \x11\x02WX\x05&\x14\x02XY\x05\x10\t\x02Y\v\x03\x02\x02\x02" +
		"Z[\x07\x13\x02\x02[\\\x05(\x15\x02\\]\x05\x12\n\x02]^\x05\x1A\x0E\x02" +
		"^\r\x03\x02\x02\x02_`\x07\x14\x02\x02`a\x05*\x16\x02ab\x05\x12\n\x02b" +
		"c\x05\x1A\x0E\x02cd\x07\r\x02\x02de\x05\x1C\x0F\x02e\x0F\x03\x02\x02\x02" +
		"fg\x07\v\x02\x02gl\x05\x14\v\x02hi\x07\x0E\x02\x02ik\x05\x14\v\x02jh\x03" +
		"\x02\x02\x02kn\x03\x02\x02\x02lj\x03\x02\x02\x02lm\x03\x02\x02\x02mo\x03" +
		"\x02\x02\x02nl\x03\x02\x02\x02op\x07\f\x02\x02p\x11\x03\x02\x02\x02qz" +
		"\x07\v\x02\x02rw\x05\x14\v\x02st\x07\x0E\x02\x02tv\x05\x14\v\x02us\x03" +
		"\x02\x02\x02vy\x03\x02\x02\x02wu\x03\x02\x02\x02wx\x03\x02\x02\x02x{\x03" +
		"\x02\x02\x02yw\x03\x02\x02\x02zr\x03\x02\x02\x02z{\x03\x02\x02\x02{|\x03" +
		"\x02\x02\x02|}\x07\f\x02\x02}\x13\x03\x02\x02\x02~\x7F\x05 \x11\x02\x7F" +
		"\x80\x05,\x17\x02\x80\x15\x03\x02\x02\x02\x81\x83\x07\x15\x02\x02\x82" +
		"\x84\x05.\x18\x02\x83\x82\x03\x02\x02\x02\x84\x85\x03\x02\x02\x02\x85" +
		"\x83\x03\x02\x02\x02\x85\x86\x03\x02\x02\x02\x86\x17\x03\x02\x02\x02\x87" +
		"\x89\x07\x16\x02\x02\x88\x8A\x050\x19\x02\x89\x88\x03\x02\x02\x02\x8A" +
		"\x8B\x03\x02\x02\x02\x8B\x89\x03\x02\x02\x02\x8B\x8C\x03\x02\x02\x02\x8C" +
		"\x19\x03\x02\x02\x02\x8D\x91\x07\x07\x02\x02\x8E\x90\x05\x16\f\x02\x8F" +
		"\x8E\x03\x02\x02\x02\x90\x93\x03\x02\x02\x02\x91\x8F\x03\x02\x02\x02\x91" +
		"\x92\x03\x02\x02\x02\x92\x94\x03\x02\x02\x02\x93\x91\x03\x02\x02\x02\x94" +
		"\x95\x05\x18\r\x02\x95\x96\x07\b\x02\x02\x96\x1B\x03\x02\x02\x02\x97\x9B" +
		"\x07\x07\x02\x02\x98\x9A\x052\x1A\x02\x99\x98\x03\x02\x02\x02\x9A\x9D" +
		"\x03\x02\x02\x02\x9B\x99\x03\x02\x02\x02\x9B\x9C\x03\x02\x02\x02\x9C\x9E" +
		"\x03\x02\x02\x02\x9D\x9B\x03\x02\x02\x02\x9E\x9F\x07\b\x02\x02\x9F\x1D" +
		"\x03\x02\x02\x02\xA0\xA1\x07\x17\x02\x02\xA1\x1F\x03\x02\x02\x02\xA2\xA3" +
		"\x07\x17\x02\x02\xA3!\x03\x02\x02\x02\xA4\xA5\x07\x17\x02\x02\xA5#\x03" +
		"\x02\x02\x02\xA6\xA7\x07\x17\x02\x02\xA7%\x03\x02\x02\x02\xA8\xA9\x07" +
		"\x17\x02\x02\xA9\'\x03\x02\x02\x02\xAA\xAB\x07\x17\x02\x02\xAB)\x03\x02" +
		"\x02\x02\xAC\xAD\x07\x17\x02\x02\xAD+\x03\x02\x02\x02\xAE\xAF\x07\x17" +
		"\x02\x02\xAF-\x03\x02\x02\x02\xB0\xB1\x07\x17\x02\x02\xB1/\x03\x02\x02" +
		"\x02\xB2\xB3\x07\x17\x02\x02\xB31\x03\x02\x02\x02\xB4\xB5\x07\x17\x02" +
		"\x02\xB53\x03\x02\x02\x02\x0E:<ELSlwz\x85\x8B\x91\x9B";
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
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
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
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
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
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
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


