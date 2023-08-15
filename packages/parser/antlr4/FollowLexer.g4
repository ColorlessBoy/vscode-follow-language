lexer grammar FollowLexer;

WS: [ t]+ -> skip ;
NL: ('\r\n' | '\r' | '\n') -> skip ;

LINE_COMMENT : '//' (~[\n])* '\n' -> channel(HIDDEN) ;
BLOCK_COMMENT : '/*' .*? '*/' -> channel(HIDDEN);

LBRACE : '{' ;
RBRACE : '}' ;
LBRACKET : '[' ;
RBRACKET : ']' ;
LPAREN : '(' ;
RPAREN : ')' ;
EQ : '=' ;
COMMA : ',';

KW_TYPE : 'type' ;
KW_CONST : 'const' ;
KW_VAR : 'var' ;
KW_PROP : 'prop' ;
KW_AXIOM : 'axiom' ;
KW_THEOREM : 'thm' ;
KW_ASSUME : '-|' ; // proof input
KW_TARGET : '|-' ; // proof output
ID: [a-zA-Z][a-zA-Z0-9_.$]* ;