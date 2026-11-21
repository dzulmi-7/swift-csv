/** Slice-based CSV reader implementing make.fun csv-reader 1.0.0's recovery policy. */
export function run(input) {
  const text = String(input.text), header = input.header === true, n = text.length;
  const rows = [], errors = [];
  let columns = null, width = -1, p = text.charCodeAt(0) === 65279 ? 1 : 0, line = 1;
  const plain = /[,\r\n]/g, special = /["\r\n]/g;
  let recordLine, recordRow;
  const error = code => errors.push({code, line: recordLine, row: recordRow});
  function unquoted(prefix) {
    let start = p, value = prefix, added = 0;
    plain.lastIndex = p;
    for (;;) {
      const m = plain.exec(text);
      const end = m ? m.index : n;
      if (end > start) { value += text.slice(start, end); added += end - start; }
      if (!m) { p = n; return [value, 0, added]; }
      const c = m[0];
      p = end + 1;
      if (c === ',') return [value, 1, added];
      if (c === '\n') { line++; return [value, 0, added]; }
      if (text.charCodeAt(p) === 10) { p++; line++; return [value, 0, added]; }
      error('stray_cr'); start = p;
    }
  }
  function quoted() {
    const open = p, openLine = line;
    let start = ++p, value = '';
    special.lastIndex = p;
    for (;;) {
      const m = special.exec(text);
      if (!m) {
        p = open + 1; line = openLine; error('unterminated_quote');
        return unquoted('"');
      }
      const i = m.index, c = m[0];
      if (c === '\n') { line++; continue; }
      value += text.slice(start, i);
      if (c === '\r') {
        value += '\n'; line++; p = i + (text.charCodeAt(i+1) === 10 ? 2 : 1);
        start = p; special.lastIndex = p; continue;
      }
      if (text.charCodeAt(i+1) === 34) {
        value += '"'; p = i+2; start = p; special.lastIndex = p; continue;
      }
      p = i+1;
      const next = text.charCodeAt(p);
      if (p === n) return [value, 0];
      if (next === 44) { p++; return [value, 1]; }
      if (next === 10) { p++; line++; return [value, 0]; }
      if (next === 13 && text.charCodeAt(p+1) === 10) { p += 2; line++; return [value, 0]; }
      const result = unquoted(value);
      if (result[2]) error('quote_junk');
      return result;
    }
  }
  while (p < n) {
    while (p < n) {
      if (text.charCodeAt(p) === 10) {p++; line++;}
      else if (text.charCodeAt(p) === 13 && text.charCodeAt(p+1) === 10) {p += 2; line++;}
      else break;
    }
    if (p === n) break;
    recordLine = line; recordRow = header && columns === null ? null : rows.length;
    const fields = []; let field, isQuoted;
    do {
      isQuoted = text.charCodeAt(p) === 34;
      field = isQuoted ? quoted() : unquoted('');
      fields.push(field[0]);
    } while (field[1]);
    if (fields.length === 1 && fields[0] === '' && !isQuoted) continue;
    if (width < 0) width = fields.length;
    if (header && columns === null) {columns = fields; continue;}
    if (fields.length < width) {
      errors.push({code:'short_row',line:recordLine,row:recordRow,fields:fields.length});
      while (fields.length < width) fields.push('');
    } else if (fields.length > width) {
      errors.push({code:'long_row',line:recordLine,row:recordRow,extra:fields.splice(width)});
    }
    rows.push(fields);
  }
  return {columns:header ? columns ?? [] : null,rows,errors};
}
