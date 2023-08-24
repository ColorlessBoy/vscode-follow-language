parser grammar ANTLRFollowParser;

options { tokenVocab=ANTLRFollowLexer; }

root: (typeBlock | constBlock | varBlock | propBlock | axiomBlock | theoremBlock)* EOF;

typeBlock : KW_TYPE (typeDef)+ ;
constBlock : KW_CONST typeID (constID)+ ;
varBlock : KW_VAR typeID (varID)+ ;
propBlock : KW_PROP typeID propID paramBlockNonEmpty ;
axiomBlock : KW_AXIOM axiomID paramBlock contentBlock ;
theoremBlock : KW_THEOREM theoremID paramBlock contentBlock EQ proofBlock ;

paramBlockNonEmpty : LPAREN paramPair (COMMA paramPair)* RPAREN ;
paramBlock : LPAREN (paramPair (COMMA paramPair)*)? RPAREN ;
paramPair : typeID argID;
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
assumeID : ID | LPAREN | RPAREN ;
targetID : ID | LPAREN | RPAREN ;
proofID : ID | LPAREN | RPAREN ;


