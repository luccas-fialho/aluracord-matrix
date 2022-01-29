import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import Backdrop from '@mui/material/Backdrop';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

//import Button from '@mui/material/Button';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5MzgzOSwiZXhwIjoxOTU4ODY5ODM5fQ.0cQfsA6WJusElj5WB1pUJjuP9s574QbYHZrX2TEs1_Q'
const SUPABASE_URL = 'https://wdnerklsmytpskaobbaw.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function listenMessagesIRT(addMessage) {
    return supabaseClient
        .from('messages')
        .on('INSERT', (liveRes) => {
            addMessage(liveRes.new);
        })
        .subscribe();
}

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

export default function ChatPage() {
    const roteamento = useRouter();
    let loggedUser = roteamento.query.username;
    
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('username')){
            loggedUser = localStorage.getItem('username')
        }else{
            localStorage.setItem('username', loggedUser);
            //roteamento.push('/')
        }         
    }
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    const loadingImg = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/96dabfd2-9198-4e81-89bc-f65dc34c8613/d9ospke-5cbf474c-a9a9-4710-8b00-ab86ef85c223.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk2ZGFiZmQyLTkxOTgtNGU4MS04OWJjLWY2NWRjMzRjODYxM1wvZDlvc3BrZS01Y2JmNDc0Yy1hOWE5LTQ3MTAtOGIwMC1hYjg2ZWY4NWMyMjMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.y2JHq2ZW5H771q9JHG7gTU5WI01kSZjeqTwjK58Snzk'

    React.useEffect(() => {
        supabaseClient
            .from('messages')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                //console.log('Dados da consulta', data);
                setMessageList(data);
            });
        listenMessagesIRT((newMessage) => {
            setMessageList((actualListValue) => {
                return [
                    newMessage,
                    ...actualListValue
                ]
            });
        });
    }, []);

    const [data, setData] = React.useState({});

    React.useEffect(() => {
        //console.log('usuario logado ', loggedUser)

        fetch(`https://api.github.com/users/${loggedUser}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
    }, [])

    function handleNewMessage(newMessage) {
        const message = {
            //id: messageList.length + 1,
            from: loggedUser,
            dateSend: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            text: newMessage,
            name: data.name,
        }

        supabaseClient
            .from('messages')
            .insert([
                message
            ])
            .then(({ data }) => {
                console.log('Criando Mensagem', data)
            });

        setMessage('');
    }
    
    return (

        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/38094b95235473.5e92ecc4409a8.gif)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],

            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    //backgroundColor: appConfig.theme.colors.neutrals[700],
                    backgroundColor: 'rgba( 0, 0, 0, 0.6)',
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    //opacity: '0.5',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        //backgroundColor: appConfig.theme.colors.neutrals[600],
                        backgroundColor: 'rgba( 0, 0, 0, 0.6)',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        //padding: '16px',

                    }}
                >

                    {/* <MessageList mensagens={[]} /> */}
                    {messageList.length !== 0 ?
                        <>
                            <MessageList messages={messageList} setMessageList={setMessageList} loggedUser={loggedUser} />
                            <Box
                                as="form"
                                styleSheet={{
                                    display: 'flex',
                                    position: 'relative',
                                    padding: '7px',
                                    alignItems: 'center',
                                }}
                            >
                                <TextField
                                    value={message}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setMessage(value);
                                    }}
                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            if(loggedUser !== 'undefined'){
                                                if (message.length > 0)
                                                    handleNewMessage(message);
                                            }else{
                                                alert('Você deve estar logado para mandar mensagens')
                                                roteamento.push('/')
                                            }
                                        }
                                    }}
                                    placeholder="Insert your message here..."
                                    type="textarea"
                                    wrap="hard"
                                    styleSheet={{
                                        width: '100%',
                                        border: '0',
                                        resize: 'none',
                                        borderRadius: '5px',
                                        marginTop: '10px',
                                        //padding: '6px 8px',
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                        marginRight: '12px',
                                        color: appConfig.theme.colors.neutrals[200],
                                    }}
                                />
                                <ButtonSendSticker
                                    onStickerClick={(sticker) => {
                                        if(loggedUser !== 'undefined'){
                                            console.log('salva esse sticker no banco');
                                            handleNewMessage(`:sticker: ${sticker}`);
                                        }else{
                                            alert('Você deve estar logado para mandar mensagens')
                                            roteamento.push('/')
                                        }
                                    }}
                                />
                            </Box>
                        </>
                        :
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src={loadingImg}
                                sx={{ width: 200, height: 200 }}
                            />
                        </Backdrop>}
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Title>
                    PixelChat
                </Title>
                <Button
                    //onClick={localStorage.removeItem('username')}
                    type='submit'
                    label='Logout'
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary[550],
                        mainColorLight: appConfig.theme.colors.primary[500],
                        mainColorStrong: appConfig.theme.colors.primary[500],
                    }}
                    href='/'
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const [isOpen, setOpenState] = React.useState('');

    function removeMessage(idItem) {
        // Defines a new array without the message you selected to delete (not from the database)
        const newArray = props.messages.filter((message) => idItem !== message.id)

        if (newArray.length !== 0) {
            supabaseClient
                .from('messages')
                .delete()
                .match({ id: idItem }) // Deletes from the database the messsage with the id passed
                .then(({ data }) => {
                    console.log('Deletando Mensagem', data)
                    // Sets the new array to the message list just to React visualize
                    props.setMessageList(newArray)
                });
        } else {
            alert('Melhor não fazer isso! :(');
        }


    }
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
            }}
        >
            {props.messages.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            wordBreak: 'break-word',
                            borderWidth: '0px',
                            borderStyle: 'solid',
                            borderColor: appConfig.theme.colors.primary[500],
                            hover: {
                                backgroundColor: 'rgba( 0, 0, 0, 0.6)',
                            }

                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                onMouseEnter ={(event) => {
                                    
                                }}
                                styleSheet={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                    marginTop: '25px',
                                    //cursor: 'pointer',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                
                            <Text
                                styleSheet={{
                                    fontSize: '20px',
                                    color: appConfig.theme.colors.primary[500],
                                    marginTop: '15px',
                                    //marginLeft: '10px',
                                }}
                                tag="strong"
                            >
                                {message.name}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '14px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                    marginTop: '13px',

                                }}
                                tag="span"
                            >
                                {message.dateSend}
                            </Text>

                            {message.from === props.loggedUser && <Button
                                iconName='trash'
                                onClick={(event) => {
                                    event.preventDefault();
                                    removeMessage(message.id);
                                }}
                                tag="span"
                                data-id={message.id}
                                styleSheet={{
                                    fontSize: '15px',
                                    marginLeft: 'auto',
                                    display: 'flex',
                                    //backgroundColor: 'rgba( 0, 0, 0, 0)',
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.primary[550],
                                    mainColor: 'rgba( 0, 0, 0, 0)',
                                    mainColorStrong: appConfig.theme.colors.primary["000"],
                                }}
                            />}
                        </Box>
                        <Text
                            styleSheet={{
                                marginLeft: '48px',

                            }}
                        >
                            {message.text.startsWith(':sticker:')
                                ? (
                                    <Image
                                        styleSheet={{
                                            width: 'auto',
                                            height: '250px',
                                            marginLeft: '48px',
                                        }}
                                        src={message.text.replace(':sticker:', '')}
                                    />
                                )
                                : (
                                    message.text
                                )}
                        </Text>
                    </Text>
                );
            })}
        </Box>
    )
}       