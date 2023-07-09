import { ScanError, SyntaxKind, FollowScanner } from './followLanguageTypes';

export function createScanner(text: string): FollowScanner {
  const len = text.length;
  let pos = 0,
    value: string = '',
    tokenOffset = 0,
    token: SyntaxKind = SyntaxKind.Unknown,
    lineNumber = 0,
    lineStartOffset = 0,
    tokenLineStartOffset = 0,
    prevTokenLineStartOffset = 0,
    scanError: ScanError = ScanError.None;

  function setPosition(newPosition: number) {
    pos = newPosition;
    value = '';
    tokenOffset = 0;
    token = SyntaxKind.Unknown;
    scanError = ScanError.None;
  }

  function scanWord(code: number): SyntaxKind {
    // word token `[0-9a-zA-Z.]`
    while (pos < len && isValidCharacter(code)) {
      pos++;
      code = text.charCodeAt(pos);
    }
    if (tokenOffset !== pos) {
      value = text.substring(tokenOffset, pos);
      return (token = SyntaxKind.WordToken);
    }
    // some
    value += String.fromCharCode(code);
    pos++;
    return (token = SyntaxKind.Unknown);
  }

  function scanInputProofBlock(): SyntaxKind {
    const start = pos - 1;
    // Proof block input `-|`
    if (text.charCodeAt(pos + 1) === CharacterCodes.bar) {
      pos++;
      value = text.substring(start, pos);
      return (token = SyntaxKind.ProofBlockInputToken);
    }
    value = text.substring(start, pos);
    return (token = SyntaxKind.Unknown);
  }

  function scanOutputProofBlock(): SyntaxKind {
    const start = pos - 1;
    // Proof block output `|-`
    if (text.charCodeAt(pos + 1) === CharacterCodes.minus) {
      pos++;
      value = text.substring(start, pos);
      return (token = SyntaxKind.ProofBlockOutputToken);
    }
    value = text.substring(start, pos);
    return (token = SyntaxKind.Unknown);
  }

  function scanComment(): SyntaxKind {
    const start = pos - 1;
    // Single-line comment
    if (text.charCodeAt(pos + 1) === CharacterCodes.slash) {
      pos += 2;
      while (pos < len) {
        if (isLineBreak(text.charCodeAt(pos))) {
          break;
        }
        pos++;
      }
      value = text.substring(start, pos);
      return (token = SyntaxKind.LineCommentToken);
    }

    // Multi-line comment
    if (text.charCodeAt(pos + 1) === CharacterCodes.asterisk) {
      pos += 2;

      const safeLength = len - 1; // For lookahead.
      let commentClosed = false;
      while (pos < safeLength) {
        const ch = text.charCodeAt(pos);
        if (ch === CharacterCodes.asterisk && text.charCodeAt(pos + 1) === CharacterCodes.slash) {
          pos += 2;
          commentClosed = true;
          break;
        }
        pos++;
        if (isLineBreak(ch)) {
          if (ch === CharacterCodes.carriageReturn && text.charCodeAt(pos) === CharacterCodes.lineFeed) {
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
      return (token = SyntaxKind.BlockCommentToken);
    }

    // just a single slash
    value += String.fromCharCode(CharacterCodes.slash);
    pos++;

    return (token = SyntaxKind.Unknown);
  }

  function scanNext(): SyntaxKind {
    value = '';
    scanError = ScanError.None;

    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;

    if (pos >= len) {
      // at the end
      tokenOffset = len;
      return (token = SyntaxKind.EOF);
    }

    let code = text.charCodeAt(pos);

    switch (code) {
      case CharacterCodes.openBrace:
        pos++;
        return (token = SyntaxKind.OpenBraceToken);
      case CharacterCodes.closeBrace:
        pos++;
        return (token = SyntaxKind.CloseBraceToken);
      case CharacterCodes.colon:
        pos++;
        return (token = SyntaxKind.ColonToken);
      case CharacterCodes.lineFeed:
        pos++;
        if (text.charCodeAt(pos) === CharacterCodes.carriageReturn) {
          pos++;
          return (token = SyntaxKind.LineBreakToken);
        } else {
          return (token = SyntaxKind.Unknown);
        }
      case CharacterCodes.carriageReturn:
        pos++;
        return (token = SyntaxKind.LineBreakToken);
      // comments
      case CharacterCodes.slash:
        return scanComment();
      // proof block input `-|`
      case CharacterCodes.minus:
        return scanInputProofBlock();
      // proof block output `|-`
      case CharacterCodes.bar:
        return scanOutputProofBlock();
      // word token `[0-9a-zA-Z.]`
      default:
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

function isWhiteSpace(ch: number): boolean {
  return ch === CharacterCodes.space || ch === CharacterCodes.tab;
}

function isLineBreak(ch: number): boolean {
  return ch === CharacterCodes.lineFeed || ch === CharacterCodes.carriageReturn;
}

function isValidCharacter(ch: number): boolean {
  return (
    (ch >= CharacterCodes._0 && ch <= CharacterCodes._9) ||
    (ch >= CharacterCodes.A && ch <= CharacterCodes.Z) ||
    (ch >= CharacterCodes.a && ch <= CharacterCodes.z) ||
    ch === CharacterCodes.dot
  );
}

function isUnknownContentCharacter(code: CharacterCodes) {
  if (isWhiteSpace(code) || isLineBreak(code)) {
    return false;
  }
  switch (code) {
    case CharacterCodes.closeBrace:
    case CharacterCodes.openBrace:
    case CharacterCodes.colon:
    case CharacterCodes.slash:
      return false;
  }
  return true;
}

// https://github.com/microsoft/node-jsonc-parser.git
const enum CharacterCodes {
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
  closeBrace = 0x7d, // }
  closeBracket = 0x5d, // ]
  colon = 0x3a, // :
  comma = 0x2c, // ,
  dot = 0x2e, // .
  doubleQuote = 0x22, // "
  minus = 0x2d, // -
  openBrace = 0x7b, // {
  openBracket = 0x5b, // [
  plus = 0x2b, // +
  slash = 0x2f, // /
  bar = 0x7c, // |

  formFeed = 0x0c, // \f
  tab = 0x09, // \t
}
