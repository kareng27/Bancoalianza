//funcion propia de jquery
$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let cod=$('.cod').eq(btn);
       let nom=$('.nom').eq(btn);
       let mon=$('.mon').eq(btn);
       let plazo=$('.plazo').eq(btn);
    
       let c=cod.val();
       let n=nom.val();
       let m=mon.val();
       let p=plazo.val();

    
       alert(c+n+m+p);
    
    $.ajax({
    type:"POST",
    url:'/actualizarline',
    data:{
        cc:c,nn:n,mm:m,pp:p
    }
    
    });
        
    });
    
    });