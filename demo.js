const numbers = [1,-1,2,3];
const filtered = numbers.filter(n=>n>=0);
filtered.map(n=>'<li>'+n+'</li>')
document.write(filtered);
