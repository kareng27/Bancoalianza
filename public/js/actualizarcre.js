//funcion propia de jquery
$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let cod=$('.cod').eq(btn);
       let doc=$('.doc').eq(btn);
       let codli=$('.codli').eq(btn);
       let monpres=$('.monpres').eq(btn);
       let montoapro=$('.montoapro').eq(btn);
       let crepla=$('.crepla').eq(btn);
    
       let c=cod.val();
       let d=doc.val();
       let l=codli.val();
       let m=monpres.val();
       let f=montoapro.val();
       let p=crepla.val();
    
       alert(c+d+l+m+f+p);
    
    $.ajax({
    type:"POST",
    url:'/actualizarcre',
    data:{
        cc:c,dd:d,ll:l,mm:m,ff:f,pp:p
    }
    
    });
        
    });
    
    });