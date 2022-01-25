import React from 'react';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

export default function PaginaDoChat() {    
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary["500"],
                    backgroundImage: `url("https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/38094b95235473.5e92ecc4409a8.gif")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    backgroundBlendMode: 'multiply',
                }}
            >
               
            </Box>
        </>
    )
}