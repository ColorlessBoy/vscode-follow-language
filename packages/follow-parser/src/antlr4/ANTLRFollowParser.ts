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
	public static readonly RULE_assumeBlock = 9;
	public static readonly RULE_targetBlock = 10;
	public static readonly RULE_contentBlock = 11;
	public static readonly RULE_proofBlock = 12;
	public static readonly RULE_typeID = 13;
	public static readonly RULE_constID = 14;
	public static readonly RULE_varID = 15;
	public static readonly RULE_propID = 16;
	public static readonly RULE_axiomID = 17;
	public static readonly RULE_theoremID = 18;
	public static readonly RULE_argID = 19;
	public static readonly RULE_assumeID = 20;
	public static readonly RULE_targetID = 21;
	public static readonly RULE_proofID = 22;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"root", "typeBlock", "constBlock", "varBlock", "propBlock", "axiomBlock", 
		"theoremBlock", "paramBlockNonEmpty", "paramBlock", "assumeBlock", "targetBlock", 
		"contentBlock", "proofBlock", "typeID", "constID", "varID", "propID", 
		"axiomID", "theoremID", "argID", "assumeID", "targetID", "proofID",
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
			this.state = 54;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ANTLRFollowParser.KW_TYPE) | (1 << ANTLRFollowParser.KW_CONST) | (1 << ANTLRFollowParser.KW_VAR) | (1 << ANTLRFollowParser.KW_PROP) | (1 << ANTLRFollowParser.KW_AXIOM) | (1 << ANTLRFollowParser.KW_THEOREM))) !== 0)) {
				{
				this.state = 52;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ANTLRFollowParser.KW_TYPE:
					{
					this.state = 46;
					this.typeBlock();
					}
					break;
				case ANTLRFollowParser.KW_CONST:
					{
					this.state = 47;
					this.constBlock();
					}
					break;
				case ANTLRFollowParser.KW_VAR:
					{
					this.state = 48;
					this.varBlock();
					}
					break;
				case ANTLRFollowParser.KW_PROP:
					{
					this.state = 49;
					this.propBlock();
					}
					break;
				case ANTLRFollowParser.KW_AXIOM:
					{
					this.state = 50;
					this.axiomBlock();
					}
					break;
				case ANTLRFollowParser.KW_THEOREM:
					{
					this.state = 51;
					this.theoremBlock();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 56;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 57;
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
			this.state = 59;
			this.match(ANTLRFollowParser.KW_TYPE);
			this.state = 61;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 60;
				this.typeID();
				}
				}
				this.state = 63;
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
			this.state = 65;
			this.match(ANTLRFollowParser.KW_CONST);
			this.state = 66;
			this.typeID();
			this.state = 68;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 67;
				this.constID();
				}
				}
				this.state = 70;
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
			this.state = 72;
			this.match(ANTLRFollowParser.KW_VAR);
			this.state = 73;
			this.typeID();
			this.state = 75;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 74;
				this.varID();
				}
				}
				this.state = 77;
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
			this.state = 79;
			this.match(ANTLRFollowParser.KW_PROP);
			this.state = 80;
			this.typeID();
			this.state = 81;
			this.propID();
			this.state = 82;
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
			this.state = 84;
			this.match(ANTLRFollowParser.KW_AXIOM);
			this.state = 85;
			this.axiomID();
			this.state = 86;
			this.paramBlock();
			this.state = 87;
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
			this.state = 89;
			this.match(ANTLRFollowParser.KW_THEOREM);
			this.state = 90;
			this.theoremID();
			this.state = 91;
			this.paramBlock();
			this.state = 92;
			this.contentBlock();
			this.state = 93;
			this.match(ANTLRFollowParser.EQ);
			this.state = 94;
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
			this.state = 96;
			this.match(ANTLRFollowParser.LPAREN);
			this.state = 97;
			this.typeID();
			this.state = 98;
			this.argID();
			this.state = 105;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ANTLRFollowParser.COMMA) {
				{
				{
				this.state = 99;
				this.match(ANTLRFollowParser.COMMA);
				this.state = 100;
				this.typeID();
				this.state = 101;
				this.argID();
				}
				}
				this.state = 107;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 108;
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
			this.state = 110;
			this.match(ANTLRFollowParser.LPAREN);
			this.state = 122;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ANTLRFollowParser.ID) {
				{
				this.state = 111;
				this.typeID();
				this.state = 112;
				this.argID();
				this.state = 119;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ANTLRFollowParser.COMMA) {
					{
					{
					this.state = 113;
					this.match(ANTLRFollowParser.COMMA);
					this.state = 114;
					this.typeID();
					this.state = 115;
					this.argID();
					}
					}
					this.state = 121;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 124;
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
	public assumeBlock(): AssumeBlockContext {
		let _localctx: AssumeBlockContext = new AssumeBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ANTLRFollowParser.RULE_assumeBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 126;
			this.match(ANTLRFollowParser.KW_ASSUME);
			this.state = 128;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 127;
				this.assumeID();
				}
				}
				this.state = 130;
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
		this.enterRule(_localctx, 20, ANTLRFollowParser.RULE_targetBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 132;
			this.match(ANTLRFollowParser.KW_TARGET);
			this.state = 134;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 133;
				this.targetID();
				}
				}
				this.state = 136;
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
		this.enterRule(_localctx, 22, ANTLRFollowParser.RULE_contentBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 138;
			this.match(ANTLRFollowParser.LBRACE);
			this.state = 142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ANTLRFollowParser.KW_ASSUME) {
				{
				{
				this.state = 139;
				this.assumeBlock();
				}
				}
				this.state = 144;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 145;
			this.targetBlock();
			this.state = 146;
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
		this.enterRule(_localctx, 24, ANTLRFollowParser.RULE_proofBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 148;
			this.match(ANTLRFollowParser.LBRACE);
			this.state = 152;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ANTLRFollowParser.COMMA || _la === ANTLRFollowParser.ID) {
				{
				{
				this.state = 149;
				this.proofID();
				}
				}
				this.state = 154;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 155;
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
	public typeID(): TypeIDContext {
		let _localctx: TypeIDContext = new TypeIDContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ANTLRFollowParser.RULE_typeID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 157;
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
		this.enterRule(_localctx, 28, ANTLRFollowParser.RULE_constID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 159;
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
		this.enterRule(_localctx, 30, ANTLRFollowParser.RULE_varID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 161;
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
		this.enterRule(_localctx, 32, ANTLRFollowParser.RULE_propID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 163;
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
		this.enterRule(_localctx, 34, ANTLRFollowParser.RULE_axiomID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 165;
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
		this.enterRule(_localctx, 36, ANTLRFollowParser.RULE_theoremID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 167;
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
		this.enterRule(_localctx, 38, ANTLRFollowParser.RULE_argID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 169;
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
		this.enterRule(_localctx, 40, ANTLRFollowParser.RULE_assumeID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 171;
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
		this.enterRule(_localctx, 42, ANTLRFollowParser.RULE_targetID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 173;
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
		this.enterRule(_localctx, 44, ANTLRFollowParser.RULE_proofID);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 175;
			_la = this._input.LA(1);
			if (!(_la === ANTLRFollowParser.COMMA || _la === ANTLRFollowParser.ID)) {
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x17\xB4\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x07\x027\n" +
		"\x02\f\x02\x0E\x02:\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x06\x03@\n\x03" +
		"\r\x03\x0E\x03A\x03\x04\x03\x04\x03\x04\x06\x04G\n\x04\r\x04\x0E\x04H" +
		"\x03\x05\x03\x05\x03\x05\x06\x05N\n\x05\r\x05\x0E\x05O\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\b" +
		"\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03" +
		"\t\x03\t\x07\tj\n\t\f\t\x0E\tm\v\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n" +
		"\x03\n\x03\n\x03\n\x07\nx\n\n\f\n\x0E\n{\v\n\x05\n}\n\n\x03\n\x03\n\x03" +
		"\v\x03\v\x06\v\x83\n\v\r\v\x0E\v\x84\x03\f\x03\f\x06\f\x89\n\f\r\f\x0E" +
		"\f\x8A\x03\r\x03\r\x07\r\x8F\n\r\f\r\x0E\r\x92\v\r\x03\r\x03\r\x03\r\x03" +
		"\x0E\x03\x0E\x07\x0E\x99\n\x0E\f\x0E\x0E\x0E\x9C\v\x0E\x03\x0E\x03\x0E" +
		"\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13" +
		"\x03\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03\x17\x03\x17" +
		"\x03\x18\x03\x18\x03\x18\x02\x02\x02\x19\x02\x02\x04\x02\x06\x02\b\x02" +
		"\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C" +
		"\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x02\x02\x03\x04\x02" +
		"\x0E\x0E\x17\x17\x02\xAC\x028\x03\x02\x02\x02\x04=\x03\x02\x02\x02\x06" +
		"C\x03\x02\x02\x02\bJ\x03\x02\x02\x02\nQ\x03\x02\x02\x02\fV\x03\x02\x02" +
		"\x02\x0E[\x03\x02\x02\x02\x10b\x03\x02\x02\x02\x12p\x03\x02\x02\x02\x14" +
		"\x80\x03\x02\x02\x02\x16\x86\x03\x02\x02\x02\x18\x8C\x03\x02\x02\x02\x1A" +
		"\x96\x03\x02\x02\x02\x1C\x9F\x03\x02\x02\x02\x1E\xA1\x03\x02\x02\x02 " +
		"\xA3\x03\x02\x02\x02\"\xA5\x03\x02\x02\x02$\xA7\x03\x02\x02\x02&\xA9\x03" +
		"\x02\x02\x02(\xAB\x03\x02\x02\x02*\xAD\x03\x02\x02\x02,\xAF\x03\x02\x02" +
		"\x02.\xB1\x03\x02\x02\x0207\x05\x04\x03\x0217\x05\x06\x04\x0227\x05\b" +
		"\x05\x0237\x05\n\x06\x0247\x05\f\x07\x0257\x05\x0E\b\x0260\x03\x02\x02" +
		"\x0261\x03\x02\x02\x0262\x03\x02\x02\x0263\x03\x02\x02\x0264\x03\x02\x02" +
		"\x0265\x03\x02\x02\x027:\x03\x02\x02\x0286\x03\x02\x02\x0289\x03\x02\x02" +
		"\x029;\x03\x02\x02\x02:8\x03\x02\x02\x02;<\x07\x02\x02\x03<\x03\x03\x02" +
		"\x02\x02=?\x07\x0F\x02\x02>@\x05\x1C\x0F\x02?>\x03\x02\x02\x02@A\x03\x02" +
		"\x02\x02A?\x03\x02\x02\x02AB\x03\x02\x02\x02B\x05\x03\x02\x02\x02CD\x07" +
		"\x10\x02\x02DF\x05\x1C\x0F\x02EG\x05\x1E\x10\x02FE\x03\x02\x02\x02GH\x03" +
		"\x02\x02\x02HF\x03\x02\x02\x02HI\x03\x02\x02\x02I\x07\x03\x02\x02\x02" +
		"JK\x07\x11\x02\x02KM\x05\x1C\x0F\x02LN\x05 \x11\x02ML\x03\x02\x02\x02" +
		"NO\x03\x02\x02\x02OM\x03\x02\x02\x02OP\x03\x02\x02\x02P\t\x03\x02\x02" +
		"\x02QR\x07\x12\x02\x02RS\x05\x1C\x0F\x02ST\x05\"\x12\x02TU\x05\x10\t\x02" +
		"U\v\x03\x02\x02\x02VW\x07\x13\x02\x02WX\x05$\x13\x02XY\x05\x12\n\x02Y" +
		"Z\x05\x18\r\x02Z\r\x03\x02\x02\x02[\\\x07\x14\x02\x02\\]\x05&\x14\x02" +
		"]^\x05\x12\n\x02^_\x05\x18\r\x02_`\x07\r\x02\x02`a\x05\x1A\x0E\x02a\x0F" +
		"\x03\x02\x02\x02bc\x07\v\x02\x02cd\x05\x1C\x0F\x02dk\x05(\x15\x02ef\x07" +
		"\x0E\x02\x02fg\x05\x1C\x0F\x02gh\x05(\x15\x02hj\x03\x02\x02\x02ie\x03" +
		"\x02\x02\x02jm\x03\x02\x02\x02ki\x03\x02\x02\x02kl\x03\x02\x02\x02ln\x03" +
		"\x02\x02\x02mk\x03\x02\x02\x02no\x07\f\x02\x02o\x11\x03\x02\x02\x02p|" +
		"\x07\v\x02\x02qr\x05\x1C\x0F\x02ry\x05(\x15\x02st\x07\x0E\x02\x02tu\x05" +
		"\x1C\x0F\x02uv\x05(\x15\x02vx\x03\x02\x02\x02ws\x03\x02\x02\x02x{\x03" +
		"\x02\x02\x02yw\x03\x02\x02\x02yz\x03\x02\x02\x02z}\x03\x02\x02\x02{y\x03" +
		"\x02\x02\x02|q\x03\x02\x02\x02|}\x03\x02\x02\x02}~\x03\x02\x02\x02~\x7F" +
		"\x07\f\x02\x02\x7F\x13\x03\x02\x02\x02\x80\x82\x07\x15\x02\x02\x81\x83" +
		"\x05*\x16\x02\x82\x81\x03\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84\x82" +
		"\x03\x02\x02\x02\x84\x85\x03\x02\x02\x02\x85\x15\x03\x02\x02\x02\x86\x88" +
		"\x07\x16\x02\x02\x87\x89\x05,\x17\x02\x88\x87\x03\x02\x02\x02\x89\x8A" +
		"\x03\x02\x02\x02\x8A\x88\x03\x02\x02\x02\x8A\x8B\x03\x02\x02\x02\x8B\x17" +
		"\x03\x02\x02\x02\x8C\x90\x07\x07\x02\x02\x8D\x8F\x05\x14\v\x02\x8E\x8D" +
		"\x03\x02\x02\x02\x8F\x92\x03\x02\x02\x02\x90\x8E\x03\x02\x02\x02\x90\x91" +
		"\x03\x02\x02\x02\x91\x93\x03\x02\x02\x02\x92\x90\x03\x02\x02\x02\x93\x94" +
		"\x05\x16\f\x02\x94\x95\x07\b\x02\x02\x95\x19\x03\x02\x02\x02\x96\x9A\x07" +
		"\x07\x02\x02\x97\x99\x05.\x18\x02\x98\x97\x03\x02\x02\x02\x99\x9C\x03" +
		"\x02\x02\x02\x9A\x98\x03\x02\x02\x02\x9A\x9B\x03\x02\x02\x02\x9B\x9D\x03" +
		"\x02\x02\x02\x9C\x9A\x03\x02\x02\x02\x9D\x9E\x07\b\x02\x02\x9E\x1B\x03" +
		"\x02\x02\x02\x9F\xA0\x07\x17\x02\x02\xA0\x1D\x03\x02\x02\x02\xA1\xA2\x07" +
		"\x17\x02\x02\xA2\x1F\x03\x02\x02\x02\xA3\xA4\x07\x17\x02\x02\xA4!\x03" +
		"\x02\x02\x02\xA5\xA6\x07\x17\x02\x02\xA6#\x03\x02\x02\x02\xA7\xA8\x07" +
		"\x17\x02\x02\xA8%\x03\x02\x02\x02\xA9\xAA\x07\x17\x02\x02\xAA\'\x03\x02" +
		"\x02\x02\xAB\xAC\x07\x17\x02\x02\xAC)\x03\x02\x02\x02\xAD\xAE\x07\x17" +
		"\x02\x02\xAE+\x03\x02\x02\x02\xAF\xB0\x07\x17\x02\x02\xB0-\x03\x02\x02" +
		"\x02\xB1\xB2\t\x02\x02\x02\xB2/\x03\x02\x02\x02\x0E68AHOky|\x84\x8A\x90" +
		"\x9A";
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
}


export class TypeBlockContext extends ParserRuleContext {
	public KW_TYPE(): TerminalNode { return this.getToken(ANTLRFollowParser.KW_TYPE, 0); }
	public typeID(): TypeIDContext[];
	public typeID(i: number): TypeIDContext;
	public typeID(i?: number): TypeIDContext | TypeIDContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeIDContext);
		} else {
			return this.getRuleContext(i, TypeIDContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_typeBlock; }
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
}


export class ParamBlockNonEmptyContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ANTLRFollowParser.LPAREN, 0); }
	public typeID(): TypeIDContext[];
	public typeID(i: number): TypeIDContext;
	public typeID(i?: number): TypeIDContext | TypeIDContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeIDContext);
		} else {
			return this.getRuleContext(i, TypeIDContext);
		}
	}
	public argID(): ArgIDContext[];
	public argID(i: number): ArgIDContext;
	public argID(i?: number): ArgIDContext | ArgIDContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ArgIDContext);
		} else {
			return this.getRuleContext(i, ArgIDContext);
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
}


export class ParamBlockContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ANTLRFollowParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ANTLRFollowParser.RPAREN, 0); }
	public typeID(): TypeIDContext[];
	public typeID(i: number): TypeIDContext;
	public typeID(i?: number): TypeIDContext | TypeIDContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeIDContext);
		} else {
			return this.getRuleContext(i, TypeIDContext);
		}
	}
	public argID(): ArgIDContext[];
	public argID(i: number): ArgIDContext;
	public argID(i?: number): ArgIDContext | ArgIDContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ArgIDContext);
		} else {
			return this.getRuleContext(i, ArgIDContext);
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
}


export class TypeIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_typeID; }
}


export class ConstIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_constID; }
}


export class VarIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_varID; }
}


export class PropIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_propID; }
}


export class AxiomIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_axiomID; }
}


export class TheoremIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_theoremID; }
}


export class ArgIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_argID; }
}


export class AssumeIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_assumeID; }
}


export class TargetIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(ANTLRFollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_targetID; }
}


export class ProofIDContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.ID, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(ANTLRFollowParser.COMMA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ANTLRFollowParser.RULE_proofID; }
}


