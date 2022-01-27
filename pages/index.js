import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router'
import appConfig from '../config.json';
import react from 'react';

function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            ${Tag} {
                color: ${appConfig.theme.colors.primary['550']};
                font-size: 24px;
                font-weight: 600;
                line-height: 1.5;
                font-family: 'Press Start 2P', Bahnschrift Light, sans-serif;
            }
            `}</style>
        </>
    );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
    //const username = 'luccas-fialho';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const defaultProfileImage = 'https://i.imgur.com/ErUTQmz.png';

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary["500"],
                    backgroundImage: `url("https://cdna.artstation.com/p/assets/images/images/028/102/058/original/pixel-jeff-matrix-s.gif?1593487263")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        opacity: 0.93,
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={(event)=>{
                            event.preventDefault();
                            console.log('Alguem submeteu o form');
                            roteamento.push('/chat');
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h1">Boas vindas de volta!</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '16px', marginTop: '16px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            //value = {username}
                            onChange={(event)=>{
                                console.log('usuario digitou', event.target.value);
                                // Onde ta o valor?
                                const valor = event.target.value;
                                // Trocar o valor da variavel
                                // Através do React e avise quem precisa
                                setUsername(valor);
                                appConfig.username = valor;
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                            placeholder='Github username'
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            disabled={username.length < 3}
                            required
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[550],
                                mainColorLight: appConfig.theme.colors.primary[500],
                                mainColorStrong: appConfig.theme.colors.primary[500],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={username.length > 2 ? `https://github.com/${username}.png` : defaultProfileImage}
                        />
                        <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.primary[550],
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                    padding: '3px 10px',
                                    borderRadius: '1000px'
                                }}
                            >
                                {username}
                            </Text>
                        {username.length > 2 && (<Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                maxWidth: '200px',
                                padding: '16px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                flex: 1,
                                
                            }}
                        >
                        </Box>
                        )}
                    </Box>

                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}