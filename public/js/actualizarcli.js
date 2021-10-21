//funcion propia de jquery
$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let doc=$('.doc').eq(btn);
       let nom=$('.nom').eq(btn);
       let ape=$('.ape').eq(btn);
       let cor=$('.cor').eq(btn);
       let cel=$('.cel').eq(btn);
       let sex=$('.sex').eq(btn);
       let fec=$('.fec').eq(btn);
    
       let d=doc.val();
       let n=nom.val();
       let a=ape.val();
       let c=cor.val();
       let t=cel.val();
       let s=sex.val();
       let f=fec.val();
    
       alert(d+n+a+c+t+s+f);
    
    $.ajax({
    type:"POST",
    url:'/actualizarcli',
    data:{
        dd:d,nn:n,aa:a,cc:c,tt:t,ss:s,ff:f
    }
    
    });
        
    });
    
    });