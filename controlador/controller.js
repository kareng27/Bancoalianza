const connection=require('../conexion/conexion')
const cnn=connection();
const{render}=require('ejs')
const controller={};
const bcryptjs=require('bcryptjs');
controller.index=(req,res,next)=>{
    res.render('login')
    res.send("error en controlador")
}


controller.consultageneral=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbusuarios',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('usu',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

controller.insertar=async(req,res,next)=>{
    //console.log(req.body)
    const d=req.body.UsuDoc;
    const u=req.body.UsuNom;
    const c=req.body.UsuClave;
    const r=req.body.UsuRol;
    const e=req.body.UsuEstado;
    const i=req.body.UsuImagen;
    const password=await bcryptjs.hash(c,8)
 

    console.log(d,u);
    cnn.query('INSERT INTO tbusuarios SET?',{UsuDoc:d,UsuNom:u,UsuClave:password,UsuRol:r,UsuEstado:e,UsuImagen:i},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('usu')
        }
    });
    }


    controller.login=async(req,res,next)=>{
        const usu=await req.body.fullname;
        const cla=await req.body.password;
        cnn.query('SELECT * FROM tbusuarios WHERE UsuNom=?',[usu],async(err,results)=>{
            if(results!=0){
                console.log("aaaaaaaa")
            }
            if(err){
                next(new Error("Error de consulta login",err));
            }
            else if(results!=0 && await(bcryptjs.compare(cla,results[0].UsuClave))){ /*contraseña incriptada*/
                     console.log("Datos correctossss");
                     //res.redirect('usu');
                     rol=results[0].UsuRol;
                     uss=results[0].UsuNom;
                     ddc=results[0].UsuDoc;
                     req.session.login=true;
                     req.session.uss = results[0].UsuNom
                     req.session.ddc = results[0].UsuDoc

                     switch(rol){
                         case 'Cliente':
                            res.redirect('vistacli');
                             
                             break;

                         case 'Empleado':
                             res.redirect('vistaempleado');
                             break;

                         case 'Administrador':
                             res.redirect('vistaadministrador');
                             break;
                     }

                     

                    }
            else{
                     console.log("Datos incorrectos");
                     res.redirect('/');

            }
        })
    }
    


/*
controller.consultacreditos=(req,res,next)=>{
    cnn.query('SELECT * FROM tbcreditos'),(err,resbd)=>{
        if(er){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('credito_cliente',{datos:resbd});
        }
    }
}

*/

/*
controller.consultalineas=(req,res,next)=>{
    cnn.query('SELECT * FROM tblineas'),(err,resbd)=>{
        if(er){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('lineas_credito',{datos:resbd});
        }
    }
}

*/


/*inicio clientes*/
controller.consultageneralcli=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbclientes',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('cli',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }



controller.insertarcli=(req,res,next)=>{
    //console.log(req.body)
    const d=req.body.CliDoc;
    const n=req.body.CliNom;
    const a=req.body.CliApe;
    const c=req.body.CliCorreo;
    const t=req.body.CliCelular;
    const s=req.body.CliSexo;
    const f=req.body.CliFechaNac;
 

    console.log(d,n);
    cnn.query('INSERT INTO tbclientes SET?',{CliDoc:d,CliNom:n,CliApe:a,CliCorreo:c,CliCelular:t,CliSexo:s,CliFechaNac:f},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('cli')
        }
    });
    }

    controller.insertarcliem=(req,res,next)=>{
        //console.log(req.body)
        const d=req.body.CliDoc;
        const n=req.body.CliNom;
        const a=req.body.CliApe;
        const c=req.body.CliCorreo;
        const t=req.body.CliCelular;
        const s=req.body.CliSexo;
        const f=req.body.CliFechaNac;
     
    
        console.log(d,n);
        cnn.query('INSERT INTO tbclientes SET?',{CliDoc:d,CliNom:n,CliApe:a,CliCorreo:c,CliCelular:t,CliSexo:s,CliFechaNac:f},(err,resbd)=>{
            if(err){
                next(new Error(err))
            }
            else{
                //console.log(resbd);
                res.redirect('cliem')
            }
        });
        }




    controller.actualizarcli=(req,res,next)=>{
        const docx=req.body.dd;
        const nomx=req.body.nn;
        const apex=req.body.aa;
        const corx=req.body.cc;
        const celx=req.body.tt;
        const seex=req.body.ss;
        const fecx=req.body.ff;

      
        cnn.query('UPDATE tbclientes set CliNom="'+nomx+'",CliApe="'+apex+'",CliCorreo="'+corx+'",CliCelular="'+celx+'",CliSexo="'+seex+'",CliFechaNac="'+fecx+'" WHERE CliDoc="'+docx+'"', (err,respbb)=>{
      
          if(err){
              next(new Error(err));
          }
          else{
              console.log("Actualizado")
              res.redirect('cli')
          }
        })
      }


      controller.eliminarcli=(req,res,next)=>{
        const docl=req.body.dd;
      
        cnn.query('DELETE from tbclientes WHERE CliDoc="'+docl+'"', (err,respbb)=>{
      
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('cli')
          }
        })
    }


controller.cliente=(req,res,next)=>{/*vista del cliente*/
    console.log("en la vista de usuario");
    res.render('vistacliente');

}
/*fin clientes*/



/*inicio credito*/
controller.consultageneralcre=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbcreditos',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('credito_cliente',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.insertarcre=(req,res,next)=>{
    //console.log(req.body)
    const c=req.body.CreCodigo;
    const d=req.body.CliDoc;
    const l=req.body.LinCod;
    const m=req.body.CreMontoPrestamo;
    const f=req.body.CreFechaAprobada;
    const p=req.body.CrePlazo;    
    
    console.log(d,c);
    cnn.query('INSERT INTO tbcreditos SET?',{CreCodigo:c,CliDoc:d,LinCod:l,CreMontoPrestamo:m,CreFechaAprobada:f,CrePlazo:p},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('credito_cliente')
        }
    });
}

controller.insertarcreem=(req,res,next)=>{
    //console.log(req.body)
    const c=req.body.CreCodigo;
    const d=req.body.CliDoc;
    const l=req.body.LinCod;
    const m=req.body.CreMontoPrestamo;
    const f=req.body.CreFechaAprobada;
    const p=req.body.CrePlazo;    
    
    console.log(d,c);
    cnn.query('INSERT INTO tbcreditos SET?',{CreCodigo:c,CliDoc:d,LinCod:l,CreMontoPrestamo:m,CreFechaAprobada:f,CrePlazo:p},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('credito_clienteem')
        }
    });
}



    controller.actualizarcre=(req,res,next)=>{
        const codigox=req.body.cc;
        const docx=req.body.dd;
        const lincx=req.body.ll;
        const monx=req.body.mm;
        const fechx=req.body.ff;
        const plax=req.body.pp;

      
        cnn.query('UPDATE tbcreditos set CreCodigo="'+codigox+'",LinCod="'+lincx+'",CreMontoPrestamo="'+monx+'",CreFechaAprobada="'+fechx+'",CrePlazo="'+plax+'" WHERE CliDoc="'+docx+'"', (err,respbb)=>{
      
          if(err){
              next(new Error(err));
          }
          else{
              console.log("Actualizado")
              res.redirect('credito_cliente')
          }
        })
      }

      controller.eliminarcre=(req,res,next)=>{
        const docr=req.body.cc;
      console.log("entro",docr)
        cnn.query('DELETE from tbcreditos WHERE CreCodigo="'+docr+'"', async(err,respbb)=>{
      
          if(err){
            next(new Error(err));
            console.log("err")
          }
          else{
            console.log("Eliminado")
            res.redirect('credito_cliente')
          }
        })
    }

    /*controller.eliminarcreem=(req,res,next)=>{
        const docr=req.body.cc;
      console.log("entro primero",docr)
        cnn.query('DELETE from tbcreditos WHERE CreCodigo="'+docr+'"', async(err,respbb)=>{
      
          if(err){
            next(new Error(err));
            console.log("err")
          }
          else{
            console.log("Eliminado")
            res.redirect('credito_clienteem')
          }
        })
    }/*



/*fin credito*/


/*inicio lineas*/
controller.consultageneralline=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tblineas',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('lineas_credito',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


    controller.insertarline=(req,res,next)=>{
        //console.log(req.body)
        const c=req.body.LinCod;
        const n=req.body.LinNom;
        const m=req.body.LinMontoMaxiCredito;
        const p=req.body.LinPlazoMaxCre;   
        
        console.log(n,c);
        cnn.query('INSERT INTO tblineas SET?',{LinCod:c,LinNom:n,LinMontoMaxiCredito:m,LinPlazoMaxCre:p},(err,resbd)=>{
            if(err){
                next(new Error(err))
            }
            else{
                //console.log(resbd);
                res.redirect('lineas_credito')
            }
        });
    }

    controller.insertarlineem=(req,res,next)=>{
        //console.log(req.body)
        const c=req.body.LinCod;
        const n=req.body.LinNom;
        const m=req.body.LinMontoMaxiCredito;
        const p=req.body.LinPlazoMaxCre;   
        
        console.log(n,c);
        cnn.query('INSERT INTO tblineas SET?',{LinCod:c,LinNom:n,LinMontoMaxiCredito:m,LinPlazoMaxCre:p},(err,resbd)=>{
            if(err){
                next(new Error(err))
            }
            else{
                //console.log(resbd);
                res.redirect('lineas_creditoem')
            }
        });
    }
    
     controller.actualizarline=(req,res,next)=>{
        const codx=req.body.cc;
        const nomx=req.body.nn;
        const monx=req.body.mm;
        const plax=req.body.pp;
          
        cnn.query('UPDATE tblineas set LinNom="'+nomx+'",LinMontoMaxiCredito="'+monx+'",LinPlazoMaxCre="'+plax+'" WHERE LinCod="'+codx+'"', async(err,respbb)=>{
          
            if(err){
                next(new Error(err));
            }
            else{
                console.log("Actualizado")
                res.redirect('lineas_credito')
            }
        })
    }

    controller.eliminarline=(req,res,next)=>{
        const doci=req.body.cc;
      
        cnn.query('DELETE from tblineas WHERE LinCod="'+doci+'"', async(err,respbb)=>{
      
          if(err){
            next(new Error(err));
          }
          else{
            console.log("Eliminado")
            res.redirect('lineas_credito')
          }
        })
    }



/*fin lineas*/

/*inicio administrador*/
controller.vistaadministrador=(req,res,next)=>{
    if(req.session.login){  
    console.log("En la vista administrador")
    res.render('vistaadministrador')
    }
    else{
        res.redirect('/');
    }
}
/*fin administrador*/

/*inicio empleado*/
controller.vistaempleado=(req,res,next)=>{
    if(req.session.login){  
    console.log("En la vista empleado")
    res.render('vistaempleado')
    }
    else{
        res.redirect('/');
    }
}


controller.consultageneralusuem=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbusuarios',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('usuem',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.consultageneralcliem=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbclientes',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('cliem',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.consultageneralcreem=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbcreditos',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('credito_clienteem',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.consultagenerallineem=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tblineas',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('lineas_creditoem',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

/*fin empleado*/


/*inicio de la vista del cliente*/
controller.vistacli=(req,res,next)=>{
    if(req.session.login){
        cnn.query('SELECT * FROM tbclientes WHERE CliDoc="'+[ddc]+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("En la vista cliente")
              res.render('vistacli')
            }
            else{
                console.log(resbd)
                res.render('vistacli',{datos:resbd});
            }
        }) 
    }


}

controller.consultageneralcrecli=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbcreditos WHERE CliDoc="'+[ddc]+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('credito_clientecli',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.consultagenerallinecli=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tblineas INNER JOIN tbcreditos ON (tbcreditos.Lincod=tblineas.Lincod) INNER JOIN tbusuarios ON (UsuDoc=CliDoc) WHERE UsuNom="'+[uss]+'" ',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('lineas_creditocli',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.consultageneralusucli=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbusuarios WHERE UsuDoc="'+[ddc]+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('usucli',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.actualizarusucli=async(req,res,next)=>{
    const docx=req.body.dd;
    const usux=req.body.uu;
    const clax=req.body.cc;
    const password=await bcryptjs.hash(clax,8)
  
    cnn.query('UPDATE tbusuarios set UsuNom="'+usux+'",UsuClave="'+password+'" WHERE UsuDoc="'+docx+'"', async(err,respbb)=>{
  
      if(err){
          next(new Error(err));
      }
      else{
          console.log("Actualizado")
          res.redirect('/')
      }
    })
  }


/*fin cliente*/


/*inicio cuenta */
controller.consultageneralcuen=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbcuentas',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('cuenta',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.insertarcuen=(req,res,next)=>{
    //console.log(req.body)
    const c=req.body.CueCod;
    const d=req.body.CueDoc;
    const t=req.body.CueTipo;
    const s=req.body.CueSaldo;


    console.log(d,c);
    cnn.query('INSERT INTO tbcuentas SET?',{CueCod:c,CueDoc:d,CueTipo:t,CueSaldo:s},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('cuenta')
        }
    });
    }

    controller.eliminarcuen=(req,res,next)=>{
        const doca=req.body.cc;
        console.log("uno")
        cnn.query('DELETE from tbcuentas WHERE CueCod="'+doca+'"', async(err,respbb)=>{
      
          if(err){
            next(new Error(err));
            console.log("dos")
          }
          else{
            console.log("Eliminado")
            res.redirect('cuenta')
          }
        })
    }

    controller.consultageneralcuencli=(req,res,next)=>{
        if(req.session.login){
        cnn.query('SELECT * FROM tbcuentas INNER JOIN tbusuarios on (UsuDoc=CueDoc) WHERE UsuNom="'+[uss]+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('cuentacli',{datos:resbd});
            }
        }) 
    }
    else{
        res.redirect('/');
    }
     }
/*fin cuenta*/








controller.eliminar=(req,res,next)=>{
    const docf=req.body.dd;
  
    cnn.query('DELETE from tbusuarios WHERE UsuDoc="'+docf+'"', async(err,respbb)=>{
  
      if(err){
        next(new Error(err));
      }
      else{
        console.log("Eliminado")
        res.redirect('usu')
      }
    })
}


controller.actualizar=async(req,res,next)=>{
    const docx=req.body.dd;
    const usux=req.body.uu;
    const clax=req.body.cc;
    const rolx=req.body.rr;
    const estx=req.body.ee;
    const imgx=req.body.ii;
    const password=await bcryptjs.hash(clax,8)
  
    cnn.query('UPDATE tbusuarios set UsuNom="'+usux+'",UsuClave="'+password+'",UsuRol="'+rolx+'",UsuEstado="'+estx+'",UsuImagen="'+imgx+'" WHERE UsuDoc="'+docx+'"', async(err,respbb)=>{
  
      if(err){
          next(new Error(err));
      }
      else{
          console.log("Actualizado")
          res.redirect('usu')
      }
    })
  }



controller.cerrar=(req,res,next)=>{/*cerrar sesion*/
    req.session.destroy(()=>{
        res.redirect('/');
    });
}


/*inicio cuenta*/
controller.consignar=(req,res,next)=>{
    res.render('consignar')
    res.send("error en controlador")
}
controller.retirar=(req,res,next)=>{
    res.render('retirar')
    res.send("error en controlador")
}
controller.tran=(req,res,next)=>{
    res.render('tran')
    res.send("error en controlador")
}

controller.tran=async(req,res,next)=>{  
    const d=req.body.CueDoc;
    const s=req.body.CueSaldo;    
    const t=req.body.CueTipo;
    console.log(s);
    cnn.query('UPDATE tbcuentas SET CueSaldo= CueSaldo -"'+s+'" WHERE CueDoc="'+ddc+'" AND CueTipo="Ahorros"',async(err,respbb)=>{ 
    if(err){    
        next(new Error(err)); 
    }
    else{
     
        console.log(respbb);
        res.render('tran',{Datos:respbb}); 
    }
    });
    cnn.query('UPDATE tbcuentas SET CueSaldo= CueSaldo +"'+s+'" WHERE CueDoc="'+d+'" AND CueTipo="'+t+'"',async(err,respbb)=>{ 
        if(err){    
            next(new Error(err)); 
        }
        else{
            console.log(respbb);
            res.render('tran',{Datos:respbb}); 
        }
        });
     }

controller.reti=(req,res,next)=>{/*retirar saldo de la cuenta*/
    const s=req.body.CueSaldo;   
    const t=req.body.CueTipo;
    console.log(s);
    cnn.query('UPDATE tbcuentas SET CueSaldo= CueSaldo -"'+s+'" WHERE CueDoc="'+ddc+'" AND CueTipo="'+t+'"',async(err,respbb)=>{ 
    if(err){    
        next(new Error(err)); 
    }
    else{
        console.log(respbb);
        res.render('retirar',{Datos:respbb}); 
    }
    }); 
}

controller.con=(req,res,next)=>{/*consignar al saldo de la cuenta*/
    const s=req.body.CueSaldo; 
    const t=req.body.CueTipo;
    console.log(s);
    cnn.query('UPDATE tbcuentas SET CueSaldo= CueSaldo +"'+s+'" WHERE CueDoc="'+ddc+'" AND CueTipo="'+t+'"',async(err,respbb)=>{
    if(err){    
        next(new Error(err)); 
    }
    else{
        console.log(respbb);
        res.render('consignar',{Datos:respbb}); 
    }
    }); 
}

/*fin cuenta*/





/*inicio paginas vista general*/


controller.general=(req,res,next)=>{
    res.render('index')
    res.send("error en controlador")
}

controller.acerca=(req,res,next)=>{
    res.render('acercadenosotros')
    res.send("error en controlador")
}

controller.nece=(req,res,next)=>{
    res.render('necesidades')
    res.send("error en controlador")
}

controller.prod=(req,res,next)=>{
    res.render('productos')
    res.send("error en controlador")
}


/*fin paginas vistas general*/

module.exports=controller;