//funcion propia de jquery
$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let doc=$('.doc').eq(btn);
       let usu=$('.usu').eq(btn);
       let cla=$('.cla').eq(btn);
    
       let d=doc.val();
       let u=usu.val();
       let c=cla.val();
    
       alert(d+u+c);
    
    $.ajax({
    type:"POST",
    url:'/actualizarusucli',
    data:{
        dd:d,uu:u,cc:c
    }
    
    });
        
    });
    
    });