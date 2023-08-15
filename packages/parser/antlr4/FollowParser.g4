parser grammar FollowParser;

options { tokenVocab=FollowLexer; }

root: (typeBlock | constBlock | varBlock | propBlock | axiomBlock | theoremBlock)* EOF;

typeBlock : KW_TYPE (typeID)+ ;
constBlock : KW_CONST typeID (constID)+ ;
varBlock : KW_VAR typeID (varID)+ ;
propBlock : KW_PROP typeID propID paramBlock ;
axiomBlock : KW_AXIOM axiomID paramBlock contentBlock ;
theoremBlock : KW_THEOREM axiomID paramBlock contentBlock EQ proofBlock ;

paramBlock : LPAREN typeID argID (COMMA typeID argID)* RPAREN ;
assumeBlock : KW_ASSUME (assumeID)+ ;
targetBlock : KW_TARGET (targetID)+ ;
contentBlock : LBRACE (assumeBlock)* targetBlock RBRACE ;
proofBlock : LBRACE (proofID)* RBRACE ;

typeID : ID ;
constID : ID ;
varID : ID ;
propID : ID ;
axiomID : ID ;
theoremID : ID ;
argID : ID ;
assumeID : ID ;
targetID : ID ;
proofID : ID ;


