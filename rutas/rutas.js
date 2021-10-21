const express=require('express')
const rutas=express.Router();
const controller=require('../controlador/controller')

rutas.get('/',controller.index);

rutas.post('/login',controller.login);

rutas.get('/index',controller.general);
rutas.get('/acercadenosotros',controller.acerca);
rutas.get('/necesidades',controller.nece);
rutas.get('/productos',controller.prod);

rutas.get('/consignar',controller.consignar);
rutas.get('/retirar',controller.retirar);
rutas.get('/tran',controller.tran);

rutas.post('/frmtran',controller.tran);
rutas.post('/frmreti',controller.reti);
rutas.post('/frmcon',controller.con);


rutas.get('/usu',controller.consultageneral);
rutas.get('/cli',controller.consultageneralcli);
rutas.get('/credito_cliente',controller.consultageneralcre);
rutas.get('/lineas_credito',controller.consultageneralline);

rutas.get('/usuem',controller.consultageneralusuem);
rutas.get('/cliem',controller.consultageneralcliem);
rutas.get('/credito_clienteem',controller.consultageneralcreem);
rutas.get('/lineas_creditoem',controller.consultagenerallineem);
rutas.get('/cuenta',controller.consultageneralcuen);
rutas.get('/cuentacli',controller.consultageneralcuencli);

rutas.get('/credito_clientecli',controller.consultageneralcrecli);
rutas.get('/lineas_creditocli',controller.consultagenerallinecli);
rutas.get('/usucli',controller.consultageneralusucli);


//rutas.get('/',controller.consultaclientes);
//rutas.get('/',controller.consultacreditos);
//rutas.get('/',controller.consultalineas);

rutas.post('/frminsertar',controller.insertar)
rutas.post('/frminsertarcli',controller.insertarcli)
rutas.post('/frminsertarcliem',controller.insertarcliem)

rutas.post('/frminsertarcre',controller.insertarcre)
rutas.post('/frminsertarcreem',controller.insertarcreem)

rutas.post('/frminsertarline',controller.insertarline)
rutas.post('/frminsertarlineem',controller.insertarlineem)

rutas.post('/frmcuenta',controller.insertarcuen)


rutas.get('/vistacliente',controller.cliente);
rutas.post('/actualizar',controller.actualizar)
rutas.post('/eliminar',controller.eliminar)

rutas.post('/actualizarcli',controller.actualizarcli)
rutas.post('/eliminarcli',controller.eliminarcli)

rutas.post('/actualizarcre',controller.actualizarcre)
rutas.post('/eliminarcre',controller.eliminarcre)

rutas.post('/actualizarline',controller.actualizarline)
rutas.post('/eliminarline',controller.eliminarline)



rutas.get('/vistaadministrador',controller.vistaadministrador);
rutas.get('/vistaempleado',controller.vistaempleado);
rutas.get('/vistacli',controller.vistacli);

rutas.post('/actualizarusucli',controller.actualizarusucli)

rutas.post('/eliminarcuen',controller.eliminarcuen)

rutas.get('/cerrar',controller.cerrar)

module.exports=rutas