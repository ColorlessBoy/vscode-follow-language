// Generated from ./antlr4/FollowParser.g4 by ANTLR 4.9.0-SNAPSHOT


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


export class FollowParser extends Parser {
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
	public static readonly RULE_paramBlock = 7;
	public static readonly RULE_assumeBlock = 8;
	public static readonly RULE_targetBlock = 9;
	public static readonly RULE_contentBlock = 10;
	public static readonly RULE_proofBlock = 11;
	public static readonly RULE_typeID = 12;
	public static readonly RULE_constID = 13;
	public static readonly RULE_varID = 14;
	public static readonly RULE_propID = 15;
	public static readonly RULE_axiomID = 16;
	public static readonly RULE_theoremID = 17;
	public static readonly RULE_argID = 18;
	public static readonly RULE_assumeID = 19;
	public static readonly RULE_targetID = 20;
	public static readonly RULE_proofID = 21;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"root", "typeBlock", "constBlock", "varBlock", "propBlock", "axiomBlock", 
		"theoremBlock", "paramBlock", "assumeBlock", "targetBlock", "contentBlock", 
		"proofBlock", "typeID", "constID", "varID", "propID", "axiomID", "theoremID", 
		"argID", "assumeID", "targetID", "proofID",
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
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(FollowParser._LITERAL_NAMES, FollowParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return FollowParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "FollowParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return FollowParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return FollowParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(FollowParser._ATN, this);
	}
	// @RuleVersion(0)
	public root(): RootContext {
		let _localctx: RootContext = new RootContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, FollowParser.RULE_root);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 51;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << FollowParser.KW_TYPE) | (1 << FollowParser.KW_CONST) | (1 << FollowParser.KW_VAR) | (1 << FollowParser.KW_AXIOM) | (1 << FollowParser.KW_THEOREM))) !== 0)) {
				{
				this.state = 49;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case FollowParser.KW_TYPE:
					{
					this.state = 44;
					this.typeBlock();
					}
					break;
				case FollowParser.KW_CONST:
					{
					this.state = 45;
					this.constBlock();
					}
					break;
				case FollowParser.KW_VAR:
					{
					this.state = 46;
					this.varBlock();
					}
					break;
				case FollowParser.KW_AXIOM:
					{
					this.state = 47;
					this.axiomBlock();
					}
					break;
				case FollowParser.KW_THEOREM:
					{
					this.state = 48;
					this.theoremBlock();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 53;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 54;
			this.match(FollowParser.EOF);
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
		this.enterRule(_localctx, 2, FollowParser.RULE_typeBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 56;
			this.match(FollowParser.KW_TYPE);
			this.state = 58;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 57;
				this.typeID();
				}
				}
				this.state = 60;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === FollowParser.ID);
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
		this.enterRule(_localctx, 4, FollowParser.RULE_constBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 62;
			this.match(FollowParser.KW_CONST);
			this.state = 63;
			this.typeID();
			this.state = 65;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 64;
				this.constID();
				}
				}
				this.state = 67;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === FollowParser.ID);
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
		this.enterRule(_localctx, 6, FollowParser.RULE_varBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 69;
			this.match(FollowParser.KW_VAR);
			this.state = 70;
			this.typeID();
			this.state = 72;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 71;
				this.varID();
				}
				}
				this.state = 74;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === FollowParser.ID);
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
		this.enterRule(_localctx, 8, FollowParser.RULE_propBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 76;
			this.match(FollowParser.KW_PROP);
			this.state = 77;
			this.propID();
			this.state = 78;
			this.paramBlock();
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
		this.enterRule(_localctx, 10, FollowParser.RULE_axiomBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 80;
			this.match(FollowParser.KW_AXIOM);
			this.state = 81;
			this.axiomID();
			this.state = 82;
			this.paramBlock();
			this.state = 83;
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
		this.enterRule(_localctx, 12, FollowParser.RULE_theoremBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 85;
			this.match(FollowParser.KW_THEOREM);
			this.state = 86;
			this.axiomID();
			this.state = 87;
			this.paramBlock();
			this.state = 88;
			this.contentBlock();
			this.state = 89;
			this.match(FollowParser.EQ);
			this.state = 90;
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
	public paramBlock(): ParamBlockContext {
		let _localctx: ParamBlockContext = new ParamBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, FollowParser.RULE_paramBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 92;
			this.match(FollowParser.LPAREN);
			this.state = 93;
			this.typeID();
			this.state = 94;
			this.argID();
			this.state = 101;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FollowParser.COMMA) {
				{
				{
				this.state = 95;
				this.match(FollowParser.COMMA);
				this.state = 96;
				this.typeID();
				this.state = 97;
				this.argID();
				}
				}
				this.state = 103;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 104;
			this.match(FollowParser.RPAREN);
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
		this.enterRule(_localctx, 16, FollowParser.RULE_assumeBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 106;
			this.match(FollowParser.KW_ASSUME);
			this.state = 108;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 107;
				this.assumeID();
				}
				}
				this.state = 110;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === FollowParser.ID);
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
		this.enterRule(_localctx, 18, FollowParser.RULE_targetBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 112;
			this.match(FollowParser.KW_TARGET);
			this.state = 114;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 113;
				this.targetID();
				}
				}
				this.state = 116;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === FollowParser.ID);
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
		this.enterRule(_localctx, 20, FollowParser.RULE_contentBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 118;
			this.match(FollowParser.LBRACE);
			this.state = 122;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FollowParser.KW_ASSUME) {
				{
				{
				this.state = 119;
				this.assumeBlock();
				}
				}
				this.state = 124;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 125;
			this.targetBlock();
			this.state = 126;
			this.match(FollowParser.RBRACE);
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
		this.enterRule(_localctx, 22, FollowParser.RULE_proofBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 128;
			this.match(FollowParser.LBRACE);
			this.state = 132;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FollowParser.ID) {
				{
				{
				this.state = 129;
				this.proofID();
				}
				}
				this.state = 134;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 135;
			this.match(FollowParser.RBRACE);
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
		this.enterRule(_localctx, 24, FollowParser.RULE_typeID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 137;
			this.match(FollowParser.ID);
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
		this.enterRule(_localctx, 26, FollowParser.RULE_constID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 139;
			this.match(FollowParser.ID);
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
		this.enterRule(_localctx, 28, FollowParser.RULE_varID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 141;
			this.match(FollowParser.ID);
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
		this.enterRule(_localctx, 30, FollowParser.RULE_propID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 143;
			this.match(FollowParser.ID);
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
		this.enterRule(_localctx, 32, FollowParser.RULE_axiomID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 145;
			this.match(FollowParser.ID);
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
		this.enterRule(_localctx, 34, FollowParser.RULE_theoremID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 147;
			this.match(FollowParser.ID);
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
		this.enterRule(_localctx, 36, FollowParser.RULE_argID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.match(FollowParser.ID);
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
		this.enterRule(_localctx, 38, FollowParser.RULE_assumeID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 151;
			this.match(FollowParser.ID);
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
		this.enterRule(_localctx, 40, FollowParser.RULE_targetID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 153;
			this.match(FollowParser.ID);
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
		this.enterRule(_localctx, 42, FollowParser.RULE_proofID);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 155;
			this.match(FollowParser.ID);
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x17\xA0\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x07\x024\n\x02\f\x02\x0E\x027\v\x02" +
		"\x03\x02\x03\x02\x03\x03\x03\x03\x06\x03=\n\x03\r\x03\x0E\x03>\x03\x04" +
		"\x03\x04\x03\x04\x06\x04D\n\x04\r\x04\x0E\x04E\x03\x05\x03\x05\x03\x05" +
		"\x06\x05K\n\x05\r\x05\x0E\x05L\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07" +
		"\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x07\tf\n\t\f\t\x0E\ti\v\t" +
		"\x03\t\x03\t\x03\n\x03\n\x06\no\n\n\r\n\x0E\np\x03\v\x03\v\x06\vu\n\v" +
		"\r\v\x0E\vv\x03\f\x03\f\x07\f{\n\f\f\f\x0E\f~\v\f\x03\f\x03\f\x03\f\x03" +
		"\r\x03\r\x07\r\x85\n\r\f\r\x0E\r\x88\v\r\x03\r\x03\r\x03\x0E\x03\x0E\x03" +
		"\x0F\x03\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03" +
		"\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03\x17\x03\x17\x03" +
		"\x17\x02\x02\x02\x18\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02" +
		"\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02" +
		"\"\x02$\x02&\x02(\x02*\x02,\x02\x02\x02\x02\x96\x025\x03\x02\x02\x02\x04" +
		":\x03\x02\x02\x02\x06@\x03\x02\x02\x02\bG\x03\x02\x02\x02\nN\x03\x02\x02" +
		"\x02\fR\x03\x02\x02\x02\x0EW\x03\x02\x02\x02\x10^\x03\x02\x02\x02\x12" +
		"l\x03\x02\x02\x02\x14r\x03\x02\x02\x02\x16x\x03\x02\x02\x02\x18\x82\x03" +
		"\x02\x02\x02\x1A\x8B\x03\x02\x02\x02\x1C\x8D\x03\x02\x02\x02\x1E\x8F\x03" +
		"\x02\x02\x02 \x91\x03\x02\x02\x02\"\x93\x03\x02\x02\x02$\x95\x03\x02\x02" +
		"\x02&\x97\x03\x02\x02\x02(\x99\x03\x02\x02\x02*\x9B\x03\x02\x02\x02,\x9D" +
		"\x03\x02\x02\x02.4\x05\x04\x03\x02/4\x05\x06\x04\x0204\x05\b\x05\x021" +
		"4\x05\f\x07\x0224\x05\x0E\b\x023.\x03\x02\x02\x023/\x03\x02\x02\x0230" +
		"\x03\x02\x02\x0231\x03\x02\x02\x0232\x03\x02\x02\x0247\x03\x02\x02\x02" +
		"53\x03\x02\x02\x0256\x03\x02\x02\x0268\x03\x02\x02\x0275\x03\x02\x02\x02" +
		"89\x07\x02\x02\x039\x03\x03\x02\x02\x02:<\x07\x0F\x02\x02;=\x05\x1A\x0E" +
		"\x02<;\x03\x02\x02\x02=>\x03\x02\x02\x02><\x03\x02\x02\x02>?\x03\x02\x02" +
		"\x02?\x05\x03\x02\x02\x02@A\x07\x10\x02\x02AC\x05\x1A\x0E\x02BD\x05\x1C" +
		"\x0F\x02CB\x03\x02\x02\x02DE\x03\x02\x02\x02EC\x03\x02\x02\x02EF\x03\x02" +
		"\x02\x02F\x07\x03\x02\x02\x02GH\x07\x11\x02\x02HJ\x05\x1A\x0E\x02IK\x05" +
		"\x1E\x10\x02JI\x03\x02\x02\x02KL\x03\x02\x02\x02LJ\x03\x02\x02\x02LM\x03" +
		"\x02\x02\x02M\t\x03\x02\x02\x02NO\x07\x12\x02\x02OP\x05 \x11\x02PQ\x05" +
		"\x10\t\x02Q\v\x03\x02\x02\x02RS\x07\x13\x02\x02ST\x05\"\x12\x02TU\x05" +
		"\x10\t\x02UV\x05\x16\f\x02V\r\x03\x02\x02\x02WX\x07\x14\x02\x02XY\x05" +
		"\"\x12\x02YZ\x05\x10\t\x02Z[\x05\x16\f\x02[\\\x07\r\x02\x02\\]\x05\x18" +
		"\r\x02]\x0F\x03\x02\x02\x02^_\x07\v\x02\x02_`\x05\x1A\x0E\x02`g\x05&\x14" +
		"\x02ab\x07\x0E\x02\x02bc\x05\x1A\x0E\x02cd\x05&\x14\x02df\x03\x02\x02" +
		"\x02ea\x03\x02\x02\x02fi\x03\x02\x02\x02ge\x03\x02\x02\x02gh\x03\x02\x02" +
		"\x02hj\x03\x02\x02\x02ig\x03\x02\x02\x02jk\x07\f\x02\x02k\x11\x03\x02" +
		"\x02\x02ln\x07\x15\x02\x02mo\x05(\x15\x02nm\x03\x02\x02\x02op\x03\x02" +
		"\x02\x02pn\x03\x02\x02\x02pq\x03\x02\x02\x02q\x13\x03\x02\x02\x02rt\x07" +
		"\x16\x02\x02su\x05*\x16\x02ts\x03\x02\x02\x02uv\x03\x02\x02\x02vt\x03" +
		"\x02\x02\x02vw\x03\x02\x02\x02w\x15\x03\x02\x02\x02x|\x07\x07\x02\x02" +
		"y{\x05\x12\n\x02zy\x03\x02\x02\x02{~\x03\x02\x02\x02|z\x03\x02\x02\x02" +
		"|}\x03\x02\x02\x02}\x7F\x03\x02\x02\x02~|\x03\x02\x02\x02\x7F\x80\x05" +
		"\x14\v\x02\x80\x81\x07\b\x02\x02\x81\x17\x03\x02\x02\x02\x82\x86\x07\x07" +
		"\x02\x02\x83\x85\x05,\x17\x02\x84\x83\x03\x02\x02\x02\x85\x88\x03\x02" +
		"\x02\x02\x86\x84\x03\x02\x02\x02\x86\x87\x03\x02\x02\x02\x87\x89\x03\x02" +
		"\x02\x02\x88\x86\x03\x02\x02\x02\x89\x8A\x07\b\x02\x02\x8A\x19\x03\x02" +
		"\x02\x02\x8B\x8C\x07\x17\x02\x02\x8C\x1B\x03\x02\x02\x02\x8D\x8E\x07\x17" +
		"\x02\x02\x8E\x1D\x03\x02\x02\x02\x8F\x90\x07\x17\x02\x02\x90\x1F\x03\x02" +
		"\x02\x02\x91\x92\x07\x17\x02\x02\x92!\x03\x02\x02\x02\x93\x94\x07\x17" +
		"\x02\x02\x94#\x03\x02\x02\x02\x95\x96\x07\x17\x02\x02\x96%\x03\x02\x02" +
		"\x02\x97\x98\x07\x17\x02\x02\x98\'\x03\x02\x02\x02\x99\x9A\x07\x17\x02" +
		"\x02\x9A)\x03\x02\x02\x02\x9B\x9C\x07\x17\x02\x02\x9C+\x03\x02\x02\x02" +
		"\x9D\x9E\x07\x17\x02\x02\x9E-\x03\x02\x02\x02\f35>ELgpv|\x86";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!FollowParser.__ATN) {
			FollowParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(FollowParser._serializedATN));
		}

		return FollowParser.__ATN;
	}

}

export class RootContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(FollowParser.EOF, 0); }
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
	public get ruleIndex(): number { return FollowParser.RULE_root; }
}


export class TypeBlockContext extends ParserRuleContext {
	public KW_TYPE(): TerminalNode { return this.getToken(FollowParser.KW_TYPE, 0); }
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
	public get ruleIndex(): number { return FollowParser.RULE_typeBlock; }
}


export class ConstBlockContext extends ParserRuleContext {
	public KW_CONST(): TerminalNode { return this.getToken(FollowParser.KW_CONST, 0); }
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
	public get ruleIndex(): number { return FollowParser.RULE_constBlock; }
}


export class VarBlockContext extends ParserRuleContext {
	public KW_VAR(): TerminalNode { return this.getToken(FollowParser.KW_VAR, 0); }
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
	public get ruleIndex(): number { return FollowParser.RULE_varBlock; }
}


export class PropBlockContext extends ParserRuleContext {
	public KW_PROP(): TerminalNode { return this.getToken(FollowParser.KW_PROP, 0); }
	public propID(): PropIDContext {
		return this.getRuleContext(0, PropIDContext);
	}
	public paramBlock(): ParamBlockContext {
		return this.getRuleContext(0, ParamBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_propBlock; }
}


export class AxiomBlockContext extends ParserRuleContext {
	public KW_AXIOM(): TerminalNode { return this.getToken(FollowParser.KW_AXIOM, 0); }
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
	public get ruleIndex(): number { return FollowParser.RULE_axiomBlock; }
}


export class TheoremBlockContext extends ParserRuleContext {
	public KW_THEOREM(): TerminalNode { return this.getToken(FollowParser.KW_THEOREM, 0); }
	public axiomID(): AxiomIDContext {
		return this.getRuleContext(0, AxiomIDContext);
	}
	public paramBlock(): ParamBlockContext {
		return this.getRuleContext(0, ParamBlockContext);
	}
	public contentBlock(): ContentBlockContext {
		return this.getRuleContext(0, ContentBlockContext);
	}
	public EQ(): TerminalNode { return this.getToken(FollowParser.EQ, 0); }
	public proofBlock(): ProofBlockContext {
		return this.getRuleContext(0, ProofBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_theoremBlock; }
}


export class ParamBlockContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(FollowParser.LPAREN, 0); }
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
	public RPAREN(): TerminalNode { return this.getToken(FollowParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FollowParser.COMMA);
		} else {
			return this.getToken(FollowParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_paramBlock; }
}


export class AssumeBlockContext extends ParserRuleContext {
	public KW_ASSUME(): TerminalNode { return this.getToken(FollowParser.KW_ASSUME, 0); }
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
	public get ruleIndex(): number { return FollowParser.RULE_assumeBlock; }
}


export class TargetBlockContext extends ParserRuleContext {
	public KW_TARGET(): TerminalNode { return this.getToken(FollowParser.KW_TARGET, 0); }
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
	public get ruleIndex(): number { return FollowParser.RULE_targetBlock; }
}


export class ContentBlockContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(FollowParser.LBRACE, 0); }
	public targetBlock(): TargetBlockContext {
		return this.getRuleContext(0, TargetBlockContext);
	}
	public RBRACE(): TerminalNode { return this.getToken(FollowParser.RBRACE, 0); }
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
	public get ruleIndex(): number { return FollowParser.RULE_contentBlock; }
}


export class ProofBlockContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(FollowParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(FollowParser.RBRACE, 0); }
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
	public get ruleIndex(): number { return FollowParser.RULE_proofBlock; }
}


export class TypeIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(FollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_typeID; }
}


export class ConstIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(FollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_constID; }
}


export class VarIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(FollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_varID; }
}


export class PropIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(FollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_propID; }
}


export class AxiomIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(FollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_axiomID; }
}


export class TheoremIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(FollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_theoremID; }
}


export class ArgIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(FollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_argID; }
}


export class AssumeIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(FollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_assumeID; }
}


export class TargetIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(FollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_targetID; }
}


export class ProofIDContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(FollowParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FollowParser.RULE_proofID; }
}


