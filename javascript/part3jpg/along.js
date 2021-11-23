//<img src="0000.jpg" width="30%" height="30%">
for (i=0;i<5;i++){
document.write('<img src="'+ ("00000"+String(i)).slice(-4) +'.jpg" width="30%" height="30%">');
}