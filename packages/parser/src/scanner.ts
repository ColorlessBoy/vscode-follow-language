import { ScanError, TokenType, FollowScanner } from './followLanguageTypes';

export function createScanner(text: string): FollowScanner {
  const len = text.length;
  let pos = 0,
    value: string = '',
    tokenOffset = 0,
    token: TokenType = TokenType.Unknown,
    lineNumber = 0,
    lineStartOffset = 0,
    tokenLineStartOffset = 0,
    prevTokenLineStartOffset = 0,
    scanError: ScanError = ScanError.None;

  const singleCharacterTokenMap = new Map<CharacterCode, TokenType>([
    [CharacterCode.openBrace, TokenType.OpenBrace],
    [CharacterCode.closeBrace, TokenType.CloseBrace],
    [CharacterCode.openBracket, TokenType.OpenBracket],
    [CharacterCode.closeBracket, TokenType.CloseBracket],
    [CharacterCode.openParen, TokenType.OpenParen],
    [CharacterCode.closeParen, TokenType.CloseParen],
    [CharacterCode.colon, TokenType.Colon],
  ]);

  const keywordTokenMap = new Map<String, TokenType>([
    ['type', TokenType.Type],
    ['const', TokenType.Const],
    ['var', TokenType.Var],
    ['prop', TokenType.Prop],
    ['axiom', TokenType.Axiom],
    ['thm', TokenType.Theorem],
    ['-|', TokenType.ProofInput],
    ['|-', TokenType.ProofOutput]
  ])

  const ignoreCharacterList: Array<CharacterCode> = [CharacterCode.space, CharacterCode.tab, CharacterCode.formFeed];

  function setPosition(newPosition: number) {
    pos = newPosition;
    value = '';
    tokenOffset = 0;
    token = TokenType.Unknown;
    scanError = ScanError.None;
  }

  function scanSingleCharacterToken(code: number): TokenType {
    // A singleCharacterToken does not need value, 
    // because its value is included in its token type.
    pos++;
    return token = (singleCharacterTokenMap.get(code) || TokenType.Unknown);
  }

  function scanWord(code: number): TokenType {
    // word token `[0-9a-zA-Z.-|]`
    while (pos < len && isValidCharacter(code)) {
      pos++;
      code = text.charCodeAt(pos);
    }
    if (tokenOffset !== pos) {
      value = text.substring(tokenOffset, pos);
      return token = (keywordTokenMap.get(value) || TokenType.Operator);
    }
    value += String.fromCharCode(code);
    pos++;
    scanError = ScanError.UnknownCharacter
    return (token = TokenType.Unknown);
  }

  function scanComment(): TokenType {
    const start = pos;
    // Single-line comment
    if (text.charCodeAt(pos + 1) === CharacterCode.slash) {
      pos += 2;
      while (pos < len) {
        if (isLineBreak(text.charCodeAt(pos))) {
          break;
        }
        pos++;
      }
      value = text.substring(start, pos);
      return (token = TokenType.LineComment);
    }

    // Multi-line comment
    if (text.charCodeAt(pos + 1) === CharacterCode.asterisk) {
      pos += 2;

      const safeLength = len - 1; // For lookahead.
      let commentClosed = false;
      while (pos < safeLength) {
        const ch = text.charCodeAt(pos);
        if (ch === CharacterCode.asterisk && text.charCodeAt(pos + 1) === CharacterCode.slash) {
          pos += 2;
          commentClosed = true;
          break;
        }
        pos++;
        if (isLineBreak(ch)) {
          if (ch === CharacterCode.carriageReturn && text.charCodeAt(pos) === CharacterCode.lineFeed) {
            pos++;
          }
          lineNumber++;
          tokenLineStartOffset = pos;
        }
      }

      if (!commentClosed) {
        pos++;
        scanError = ScanError.UnexpectedEndOfComment;
      }

      value = text.substring(start, pos);
      return (token = TokenType.BlockComment);
    }

    // just a single slash
    value += String.fromCharCode(CharacterCode.slash);
    pos++;
    scanError = ScanError.UnknownCharacter
    return (token = TokenType.Unknown);
  }

  function scanCarriageReturn(): TokenType {
    pos++;
    if (text.charCodeAt(pos) === CharacterCode.lineFeed) {
      pos++;
      lineNumber++;
      tokenLineStartOffset = pos;
      return (token = TokenType.LineBreak);
    }
    scanError = ScanError.UnknownCharacter
    return (token = TokenType.Unknown);
  }

  function scanLineFeed(): TokenType {
    pos++;
    lineNumber++;
    tokenLineStartOffset = pos;
    return (token = TokenType.LineBreak);
  }

  function skipIgnoreCharacter(): void {
    while (pos < len && ignoreCharacterList.includes(text.charCodeAt(pos))) {
      pos++;
    }
  }

  function scanNext(): TokenType {
    value = '';
    scanError = ScanError.None;

    skipIgnoreCharacter();

    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;

    if (pos >= len) {
      // at the end
      tokenOffset = len;
      return (token = TokenType.EOF);
    }

    let code = text.charCodeAt(pos);

    if (singleCharacterTokenMap.has(code)) {
      return scanSingleCharacterToken(code);
    } else if (code === CharacterCode.carriageReturn) {
      return scanCarriageReturn();
    } else if (code === CharacterCode.lineFeed) {
      return scanLineFeed();
    } else if (code === CharacterCode.slash) {
      return scanComment();
    } else {
      return scanWord(code);
    }
  }

  return {
    setPosition: setPosition,
    getPosition: () => pos,
    scan: scanNext,
    getToken: () => token,
    getTokenValue: () => value,
    getTokenOffset: () => tokenOffset,
    getTokenLength: () => pos - tokenOffset,
    getTokenStartLine: () => lineStartOffset,
    getTokenStartCharacter: () => tokenOffset - prevTokenLineStartOffset,
    getTokenError: () => scanError,
  };
}

function isLineBreak(ch: number): boolean {
  return ch === CharacterCode.lineFeed || ch === CharacterCode.carriageReturn;
}

function isValidCharacter(ch: number): boolean {
  return (
    (ch >= CharacterCode._0 && ch <= CharacterCode._9) ||
    (ch >= CharacterCode.A && ch <= CharacterCode.Z) ||
    (ch >= CharacterCode.a && ch <= CharacterCode.z) ||
    ch === CharacterCode.dot ||
    ch === CharacterCode.vbar ||
    ch === CharacterCode.minus
  );
}

// https://github.com/microsoft/node-jsonc-parser.git
const enum CharacterCode {
  lineFeed = 0x0a, // \n
  carriageReturn = 0x0d, // \r

  space = 0x0020, // " "

  _0 = 0x30,
  _1 = 0x31,
  _2 = 0x32,
  _3 = 0x33,
  _4 = 0x34,
  _5 = 0x35,
  _6 = 0x36,
  _7 = 0x37,
  _8 = 0x38,
  _9 = 0x39,

  a = 0x61,
  b = 0x62,
  c = 0x63,
  d = 0x64,
  e = 0x65,
  f = 0x66,
  g = 0x67,
  h = 0x68,
  i = 0x69,
  j = 0x6a,
  k = 0x6b,
  l = 0x6c,
  m = 0x6d,
  n = 0x6e,
  o = 0x6f,
  p = 0x70,
  q = 0x71,
  r = 0x72,
  s = 0x73,
  t = 0x74,
  u = 0x75,
  v = 0x76,
  w = 0x77,
  x = 0x78,
  y = 0x79,
  z = 0x7a,

  A = 0x41,
  B = 0x42,
  C = 0x43,
  D = 0x44,
  E = 0x45,
  F = 0x46,
  G = 0x47,
  H = 0x48,
  I = 0x49,
  J = 0x4a,
  K = 0x4b,
  L = 0x4c,
  M = 0x4d,
  N = 0x4e,
  O = 0x4f,
  P = 0x50,
  Q = 0x51,
  R = 0x52,
  S = 0x53,
  T = 0x54,
  U = 0x55,
  V = 0x56,
  W = 0x57,
  X = 0x58,
  Y = 0x59,
  Z = 0x5a,

  asterisk = 0x2a, // *
  backslash = 0x5c, // \
  openBrace = 0x7b, // {
  closeBrace = 0x7d, // }
  openBracket = 0x5b, // [
  closeBracket = 0x5d, // ]
  openParen = 0x28, // (
  closeParen = 0x29, // )
  colon = 0x3a, // :
  comma = 0x2c, // ,
  dot = 0x2e, // .
  doubleQuote = 0x22, // "
  minus = 0x2d, // -
  plus = 0x2b, // +
  slash = 0x2f, // /
  vbar = 0x7c, // |

  formFeed = 0x0c, // \f
  tab = 0x09, // \t
}
