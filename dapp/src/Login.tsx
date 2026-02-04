import { useConnect, useConnectors } from 'wagmi'

function Login() {
    const { connect, error } = useConnect()
    const connectors = useConnectors()

    return (
        <div className='container px-4 py-5'>
            <div className='row flex-lg-row-reverse align-items-center g-5 py-5'>
                <div className='col-6'>
                    <img
                        src="https://s2-g1.glbimg.com/oQkh9RvVno32h68-r06gXaPoskI=/0x0:984x554/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/q/Q/pAo4MYTy2WU6K4pqNpTw/bbb.jpeg"
                        className='d-block mx-lg-auto img-fluid'
                        width="700"
                        height="500" />
                </div>
                <div className='col-6'>
                    <h1 className='display-5 fw-bold text-body-emphasis lh-1 mb-3'>Webbb3</h1>
                    <p className='lead'>Votação on-chain do BBB.</p>
                    <p className='lead mb-3'>Autentique-se com sua carteira e deixe o seu voto para o próximo paredão.</p>
                    <div>
                        <button
                            type='button'
                            onClick={() => connect({ connector: connectors[0] })}
                            className='btn btn-primary btn-lg px-4 me-2'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1280px-MetaMask_Fox.svg.png?20220831120339" width="64" className='me-3' />
                            Conectar com a MetaMask
                        </button>
                    </div>
                    <p className='message'>{error ? error.message : ""}</p>
                </div>
            </div>
        </div>
    )
}

export default Login
