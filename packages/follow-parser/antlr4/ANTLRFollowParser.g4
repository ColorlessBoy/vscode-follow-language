parser grammar ANTLRFollowParser;

options { tokenVocab=ANTLRFollowLexer; }

root: importBlocks? (typeBlock | constBlock | varBlock | propBlock | axiomBlock | theoremBlock | lineCommentBlock | blockCommentBlock)* EOF;

importBlocks: (importBlock)+;
importBlock: KW_IMPORT STRING;
typeBlock : KW_TYPE (typeDef)+ ;
constBlock : KW_CONST typeID (constID)+ ;
varBlock : KW_VAR typeID (varID)+ ;
propBlock : KW_PROP typeID propID paramBlockNonEmpty ;
axiomBlock : KW_AXIOM axiomID paramBlock contentBlock ;
theoremBlock : KW_THEOREM theoremID paramBlock contentBlock EQ proofBlock ;
lineCommentBlock: LINE_COMMENT;
blockCommentBlock: BLOCK_COMMENT;

paramBlockNonEmpty : LPAREN paramPair (COMMA paramPair)* RPAREN ;
paramBlock : LPAREN (paramPair (COMMA paramPair)*)? RPAREN ;
paramPair : typeID argID;
assumeBlock : KW_ASSUME (assumeID)+ ;
targetBlock : KW_TARGET (targetID)+ ;
contentBlock : LBRACE (assumeBlock | targetBlock)+ RBRACE ;
proofBlock : LBRACE (proofID)* RBRACE ;

typeDef : ID ;
typeID : ID ;
constID : ID ;
varID : ID ;
propID : ID ;
axiomID : ID ;
theoremID : ID ;
argID : ID ;
assumeID : ID | LPAREN | RPAREN | COMMA ;
targetID : ID | LPAREN | RPAREN | COMMA ;
proofID : ID | LPAREN | RPAREN | COMMA ;


