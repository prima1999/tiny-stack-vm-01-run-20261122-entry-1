import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input';
const O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
  const p=readFileSync(join(I,id,'program.bin'));
  const q=readFileSync(join(I,id,'input.bin'));
  let pc=0,sp=0,cp=0,ip=0,st=0,ol=0,code=0;
  const s=new Int32Array(256),c=new Int32Array(64),m=new Int32Array(256);
  const b=Buffer.allocUnsafe(65536);
  let v,w,n;
  L:while(1){
    if(st>=1000000){code=10;break;}
    if(pc<0||pc>=p.length){code=9;break;}
    const o=p[pc];
    ++st;
    n=1;
    switch(o){
    case 0:code=0;break L;
    case 1:if(pc+1>=p.length){code=9;break L;}if(sp>=256){code=3;break L;}v=p[pc+1];s[sp++]=v>127?v-256:v;n=2;break;
    case 2:if(pc+4>=p.length){code=9;break L;}if(sp>=256){code=3;break L;}s[sp++]=p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24;n=5;break;
    case 3:if(sp<1){code=2;break L;}sp--;break;
    case 4:if(sp<1){code=2;break L;}if(sp>=256){code=3;break L;}s[sp]=s[sp-1];sp++;break;
    case 5:if(sp<2){code=2;break L;}v=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=v;break;
    case 6:if(sp<2){code=2;break L;}if(sp>=256){code=3;break L;}s[sp]=s[sp-2];sp++;break;
    case 7:if(sp<3){code=2;break L;}v=s[sp-3];s[sp-3]=s[sp-2];s[sp-2]=s[sp-1];s[sp-1]=v;break;
    case 16:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]+=w;break;
    case 17:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]-=w;break;
    case 18:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]=Math.imul(s[sp-1],w);break;
    case 19:if(sp<2){code=2;break L;}w=s[--sp];if(!w){code=4;break L;}s[sp-1]=(s[sp-1]/w)|0;break;
    case 20:if(sp<2){code=2;break L;}w=s[--sp];if(!w){code=4;break L;}s[sp-1]%=w;break;
    case 21:if(sp<2){code=2;break L;}w=s[--sp];if(!w){code=4;break L;}s[sp-1]=((s[sp-1]>>>0)/(w>>>0))|0;break;
    case 22:if(sp<2){code=2;break L;}w=s[--sp];if(!w){code=4;break L;}s[sp-1]=((s[sp-1]>>>0)%(w>>>0))|0;break;
    case 23:if(sp<1){code=2;break L;}s[sp-1]=-s[sp-1];break;
    case 24:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]&=w;break;
    case 25:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]|=w;break;
    case 26:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]^=w;break;
    case 27:if(sp<1){code=2;break L;}s[sp-1]=~s[sp-1];break;
    case 28:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]<<=w&31;break;
    case 29:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]>>=w&31;break;
    case 30:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]=s[sp-1]>>>(w&31);break;
    case 32:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]=s[sp-1]===w?1:0;break;
    case 33:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]=s[sp-1]<w?1:0;break;
    case 34:if(sp<2){code=2;break L;}w=s[--sp];s[sp-1]=(s[sp-1]>>>0)<(w>>>0)?1:0;break;
    case 48:if(pc+2>=p.length){code=9;break L;}v=p[pc+1]|p[pc+2]<<8;pc+=3+(v>32767?v-65536:v);continue L;
    case 49:if(pc+2>=p.length){code=9;break L;}if(sp<1){code=2;break L;}v=p[pc+1]|p[pc+2]<<8;w=s[--sp];if(!w){pc+=3+(v>32767?v-65536:v);continue L;}n=3;break;
    case 50:if(pc+2>=p.length){code=9;break L;}if(sp<1){code=2;break L;}v=p[pc+1]|p[pc+2]<<8;w=s[--sp];if(w){pc+=3+(v>32767?v-65536:v);continue L;}n=3;break;
    case 51:if(pc+2>=p.length){code=9;break L;}if(cp>=64){code=7;break L;}c[cp++]=pc+3;pc=p[pc+1]|p[pc+2]<<8;continue L;
    case 52:if(cp<1){code=8;break L;}pc=c[--cp];continue L;
    case 64:if(sp<1){code=2;break L;}v=s[sp-1];if(v<0||v>255){code=6;break L;}s[sp-1]=m[v];break;
    case 65:if(sp<2){code=2;break L;}v=s[--sp];w=s[--sp];if(v<0||v>255){code=6;break L;}m[v]=w;break;
    case 80:if(sp<1){code=2;break L;}v=s[--sp];w=String(v);if(ol+w.length>65536){code=11;break L;}ol+=b.write(w,ol);break;
    case 81:if(sp<1){code=2;break L;}v=s[--sp];if(ol>=65536){code=11;break L;}b[ol++]=v&255;break;
    case 82:if(sp>=256){code=3;break L;}s[sp++]=ip<q.length?q[ip++]:-1;break;
    case 83:if(sp<1){code=2;break L;}code=s[--sp]&255;break L;
    default:code=5;break L;
    } // end switch
    pc+=n;
  } // end run
  mkdirSync(join(O,id),{recursive:true});
  writeFileSync(join(O,id,'stdout.bin'),b.subarray(0,ol));
  writeFileSync(join(O,id,'exit.txt'),code+'\n');
} // end all
