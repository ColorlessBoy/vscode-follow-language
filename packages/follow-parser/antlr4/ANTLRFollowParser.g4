parser grammar ANTLRFollowParser;

options { tokenVocab=ANTLRFollowLexer; }

root: (typeBlock | constBlock | varBlock | propBlock | axiomBlock | theoremBlock)* EOF;

typeBlock : KW_TYPE (typeDef)+ ;
constBlock : KW_CONST typeID (constID)+ ;
varBlock : KW_VAR typeID (varID)+ ;
propBlock : KW_PROP typeID propID paramBlockNonEmpty ;
axiomBlock : KW_AXIOM axiomID paramBlock contentBlock ;
theoremBlock : KW_THEOREM theoremID paramBlock contentBlock EQ proofBlock ;

paramBlockNonEmpty : LPAREN typeID argID (COMMA typeID argID)* RPAREN ;
paramBlock : LPAREN (typeID argID (COMMA typeID argID)*)? RPAREN ;
assumeBlock : KW_ASSUME (assumeID)+ ;
targetBlock : KW_TARGET (targetID)+ ;
contentBlock : LBRACE (assumeBlock)* targetBlock RBRACE ;
proofBlock : LBRACE (proofID)* RBRACE ;

typeDef : ID ;
typeID : ID ;
constID : ID ;
varID : ID ;
propID : ID ;
axiomID : ID ;
theoremID : ID ;
argID : ID ;
assumeID : ID ;
targetID : ID ;
proofID : ID | COMMA ;


