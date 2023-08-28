// Generated from ./antlr4/ANTLRFollowParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { RootContext } from "./ANTLRFollowParser";
import { ImportBlocksContext } from "./ANTLRFollowParser";
import { ImportBlockContext } from "./ANTLRFollowParser";
import { TypeBlockContext } from "./ANTLRFollowParser";
import { ConstBlockContext } from "./ANTLRFollowParser";
import { VarBlockContext } from "./ANTLRFollowParser";
import { PropBlockContext } from "./ANTLRFollowParser";
import { AxiomBlockContext } from "./ANTLRFollowParser";
import { TheoremBlockContext } from "./ANTLRFollowParser";
import { LineCommentBlockContext } from "./ANTLRFollowParser";
import { BlockCommentBlockContext } from "./ANTLRFollowParser";
import { ParamBlockNonEmptyContext } from "./ANTLRFollowParser";
import { ParamBlockContext } from "./ANTLRFollowParser";
import { ParamPairContext } from "./ANTLRFollowParser";
import { AssumeBlockContext } from "./ANTLRFollowParser";
import { TargetBlockContext } from "./ANTLRFollowParser";
import { ContentBlockContext } from "./ANTLRFollowParser";
import { ProofBlockContext } from "./ANTLRFollowParser";
import { TypeDefContext } from "./ANTLRFollowParser";
import { TypeIDContext } from "./ANTLRFollowParser";
import { ConstIDContext } from "./ANTLRFollowParser";
import { VarIDContext } from "./ANTLRFollowParser";
import { PropIDContext } from "./ANTLRFollowParser";
import { AxiomIDContext } from "./ANTLRFollowParser";
import { TheoremIDContext } from "./ANTLRFollowParser";
import { ArgIDContext } from "./ANTLRFollowParser";
import { AssumeIDContext } from "./ANTLRFollowParser";
import { TargetIDContext } from "./ANTLRFollowParser";
import { ProofIDContext } from "./ANTLRFollowParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ANTLRFollowParser`.
 */
export interface ANTLRFollowParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.root`.
	 * @param ctx the parse tree
	 */
	enterRoot?: (ctx: RootContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.root`.
	 * @param ctx the parse tree
	 */
	exitRoot?: (ctx: RootContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.importBlocks`.
	 * @param ctx the parse tree
	 */
	enterImportBlocks?: (ctx: ImportBlocksContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.importBlocks`.
	 * @param ctx the parse tree
	 */
	exitImportBlocks?: (ctx: ImportBlocksContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.importBlock`.
	 * @param ctx the parse tree
	 */
	enterImportBlock?: (ctx: ImportBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.importBlock`.
	 * @param ctx the parse tree
	 */
	exitImportBlock?: (ctx: ImportBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.typeBlock`.
	 * @param ctx the parse tree
	 */
	enterTypeBlock?: (ctx: TypeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.typeBlock`.
	 * @param ctx the parse tree
	 */
	exitTypeBlock?: (ctx: TypeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.constBlock`.
	 * @param ctx the parse tree
	 */
	enterConstBlock?: (ctx: ConstBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.constBlock`.
	 * @param ctx the parse tree
	 */
	exitConstBlock?: (ctx: ConstBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.varBlock`.
	 * @param ctx the parse tree
	 */
	enterVarBlock?: (ctx: VarBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.varBlock`.
	 * @param ctx the parse tree
	 */
	exitVarBlock?: (ctx: VarBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.propBlock`.
	 * @param ctx the parse tree
	 */
	enterPropBlock?: (ctx: PropBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.propBlock`.
	 * @param ctx the parse tree
	 */
	exitPropBlock?: (ctx: PropBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.axiomBlock`.
	 * @param ctx the parse tree
	 */
	enterAxiomBlock?: (ctx: AxiomBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.axiomBlock`.
	 * @param ctx the parse tree
	 */
	exitAxiomBlock?: (ctx: AxiomBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.theoremBlock`.
	 * @param ctx the parse tree
	 */
	enterTheoremBlock?: (ctx: TheoremBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.theoremBlock`.
	 * @param ctx the parse tree
	 */
	exitTheoremBlock?: (ctx: TheoremBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.lineCommentBlock`.
	 * @param ctx the parse tree
	 */
	enterLineCommentBlock?: (ctx: LineCommentBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.lineCommentBlock`.
	 * @param ctx the parse tree
	 */
	exitLineCommentBlock?: (ctx: LineCommentBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.blockCommentBlock`.
	 * @param ctx the parse tree
	 */
	enterBlockCommentBlock?: (ctx: BlockCommentBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.blockCommentBlock`.
	 * @param ctx the parse tree
	 */
	exitBlockCommentBlock?: (ctx: BlockCommentBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.paramBlockNonEmpty`.
	 * @param ctx the parse tree
	 */
	enterParamBlockNonEmpty?: (ctx: ParamBlockNonEmptyContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.paramBlockNonEmpty`.
	 * @param ctx the parse tree
	 */
	exitParamBlockNonEmpty?: (ctx: ParamBlockNonEmptyContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.paramBlock`.
	 * @param ctx the parse tree
	 */
	enterParamBlock?: (ctx: ParamBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.paramBlock`.
	 * @param ctx the parse tree
	 */
	exitParamBlock?: (ctx: ParamBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.paramPair`.
	 * @param ctx the parse tree
	 */
	enterParamPair?: (ctx: ParamPairContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.paramPair`.
	 * @param ctx the parse tree
	 */
	exitParamPair?: (ctx: ParamPairContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.assumeBlock`.
	 * @param ctx the parse tree
	 */
	enterAssumeBlock?: (ctx: AssumeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.assumeBlock`.
	 * @param ctx the parse tree
	 */
	exitAssumeBlock?: (ctx: AssumeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.targetBlock`.
	 * @param ctx the parse tree
	 */
	enterTargetBlock?: (ctx: TargetBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.targetBlock`.
	 * @param ctx the parse tree
	 */
	exitTargetBlock?: (ctx: TargetBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.contentBlock`.
	 * @param ctx the parse tree
	 */
	enterContentBlock?: (ctx: ContentBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.contentBlock`.
	 * @param ctx the parse tree
	 */
	exitContentBlock?: (ctx: ContentBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.proofBlock`.
	 * @param ctx the parse tree
	 */
	enterProofBlock?: (ctx: ProofBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.proofBlock`.
	 * @param ctx the parse tree
	 */
	exitProofBlock?: (ctx: ProofBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.typeDef`.
	 * @param ctx the parse tree
	 */
	enterTypeDef?: (ctx: TypeDefContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.typeDef`.
	 * @param ctx the parse tree
	 */
	exitTypeDef?: (ctx: TypeDefContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.typeID`.
	 * @param ctx the parse tree
	 */
	enterTypeID?: (ctx: TypeIDContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.typeID`.
	 * @param ctx the parse tree
	 */
	exitTypeID?: (ctx: TypeIDContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.constID`.
	 * @param ctx the parse tree
	 */
	enterConstID?: (ctx: ConstIDContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.constID`.
	 * @param ctx the parse tree
	 */
	exitConstID?: (ctx: ConstIDContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.varID`.
	 * @param ctx the parse tree
	 */
	enterVarID?: (ctx: VarIDContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.varID`.
	 * @param ctx the parse tree
	 */
	exitVarID?: (ctx: VarIDContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.propID`.
	 * @param ctx the parse tree
	 */
	enterPropID?: (ctx: PropIDContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.propID`.
	 * @param ctx the parse tree
	 */
	exitPropID?: (ctx: PropIDContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.axiomID`.
	 * @param ctx the parse tree
	 */
	enterAxiomID?: (ctx: AxiomIDContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.axiomID`.
	 * @param ctx the parse tree
	 */
	exitAxiomID?: (ctx: AxiomIDContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.theoremID`.
	 * @param ctx the parse tree
	 */
	enterTheoremID?: (ctx: TheoremIDContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.theoremID`.
	 * @param ctx the parse tree
	 */
	exitTheoremID?: (ctx: TheoremIDContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.argID`.
	 * @param ctx the parse tree
	 */
	enterArgID?: (ctx: ArgIDContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.argID`.
	 * @param ctx the parse tree
	 */
	exitArgID?: (ctx: ArgIDContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.assumeID`.
	 * @param ctx the parse tree
	 */
	enterAssumeID?: (ctx: AssumeIDContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.assumeID`.
	 * @param ctx the parse tree
	 */
	exitAssumeID?: (ctx: AssumeIDContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.targetID`.
	 * @param ctx the parse tree
	 */
	enterTargetID?: (ctx: TargetIDContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.targetID`.
	 * @param ctx the parse tree
	 */
	exitTargetID?: (ctx: TargetIDContext) => void;

	/**
	 * Enter a parse tree produced by `ANTLRFollowParser.proofID`.
	 * @param ctx the parse tree
	 */
	enterProofID?: (ctx: ProofIDContext) => void;
	/**
	 * Exit a parse tree produced by `ANTLRFollowParser.proofID`.
	 * @param ctx the parse tree
	 */
	exitProofID?: (ctx: ProofIDContext) => void;
}

