lexer grammar ANTLRFollowLexer;

WS: [ \t]+ -> skip ;
NL: ('\r\n' | '\r' | '\n') -> skip ;
SC: (';') -> skip;

LINE_COMMENT : '//' (~[\n])* '\n';
BLOCK_COMMENT : '/*' .*? '*/';

LBRACE : '{' ;
RBRACE : '}' ;
LBRACKET : '[' ;
RBRACKET : ']' ;
LPAREN : '(' ;
RPAREN : ')' ;
EQ : '=' ;
COMMA : ',';

SINGLE_QUOTA : '\'';
STRING: SINGLE_QUOTA .*? SINGLE_QUOTA;
KW_IMPORT: 'import';

KW_TYPE : 'type' ;
KW_CONST : 'const' ;
KW_VAR : 'var' ;
KW_PROP : 'prop' ;
KW_AXIOM : 'axiom' ;
KW_THEOREM : 'thm' ;
KW_ASSUME : '-|' ; // proof input
KW_TARGET : '|-' ; // proof output
ID: [a-zA-Z0-9_.\-]+ ;