import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import Logo from '../../Assets copy/images/logo.PNG';

const styles = StyleSheet.create({
    container: {
        marginLeft: 32,
        marginRight: 32
    },
    title: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 19,
        lineHeight: '24px',
        letterSpacing: '0.4px',
        color: '#A4A6B3',
        opacity: 0.7,
        marginLeft: 12
    }
    ,
    logo:{
        width: 80,
        height: 40,
        borderRadius: 8
    }
});

function LogoComponent() {
    return (
        <Row className={css(styles.container)} horizontal="center" vertical="center">
            <img src={Logo} className={css(styles.logo)} />
            <span className={css(styles.title)}>3eez Automotive Studios</span>
        </Row>
    );
}

export default LogoComponent;
