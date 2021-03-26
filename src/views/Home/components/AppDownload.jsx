import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main_Div: {
        overflow: 'hidden',
        backgroundColor: theme.palette.secondary.main,
      },
      app_H1: {
        textAlign: 'center',
      },
      app_Img: {
        maxHeight: '88px',
        margin: '20px',
      },
}));



function AppDownload() {
    const classes = useStyles();
    
    return (
        <div className={classes.main_Div}>
            <h1 className={classes.app_H1}>Eres estudiante?</h1>
            <h2 className={classes.app_H1}>Descarga nuestra App para completar las pruebas</h2>
            <div className={classes.app_H1}>
                <a target="_blank" href='https://appgallery.cloud.huawei.com/ag/n/app/C103843831?locale=es_US&source=appshare&subsource=C103843831'><img className={classes.app_Img} src="https://i.ibb.co/sVdLQkB/huawei-app.png" alt="huawei-app" border="0"/></a>
                <a target="_blank" href='https://play.google.com/store/apps/details?id=io.grupo3.quizzap'><img className={classes.app_Img} src="https://i.ibb.co/gW82Vk5/descargar-play-store.png" alt="descargar-play-store" border="0"/></a>
            </div>
        </div>
    )
}

export default AppDownload
