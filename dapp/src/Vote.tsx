import { useEffect, useState } from 'react';
import { useConfig } from "wagmi";
import { readContract, writeContract } from '@wagmi/core';
import ABI from "./ABI.json";

type Voting = {
  option1: string;
  option2: string;
  votes1: number;
  votes2: number;
  maxDate: number;
}

export default function Vote() {

  const CONTRACT_ADDRESS = "0x5A106Bcd9119c64e913143a32aBA30643df6E700";

  const config = useConfig();

  const [message, setMessage] = useState<string>("");
  const [voting, setVoting] = useState<Voting>({ maxDate: 0, option1: "", option2: "", votes1: 0, votes2: 0 });
  const [showVotes, setShowVotes] = useState<number>(0);

  useEffect(() => {
    readContract(config, {
      address: CONTRACT_ADDRESS,
      abi: ABI,
      chainId: config.chains[0].id,
      functionName: "getCurrentVoting",
      args: []
    })
      .then(result => {
        console.log("Current Voting:", result);
        const voting = result as Voting;
        setVoting(voting);
      })
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }, [])

  function isExpired() {
    return Number(voting.maxDate) < (Date.now() / 1000);
  }

  function getMaxDate() {
    return new Date(Number(voting.maxDate) * 1000).toLocaleString("pt-BR");
  }

  function getImageUrl(name: string) {
    switch (name) {
      case "LuizTools": return "https://luiztools.com.br/cara.jpg";
      case "Mônica": return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsUsUiAR4F4e7cu_rddp4EC2kQLI09sm9dig&usqp=CAU";
      default: return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHWFM1IG7wiMV5ef2xI-Yyxq2KCeWsjovfn5G42EwcKG15qAKzkCA2GH_V8xI3MrM0ADI&usqp=CAU"
    }
  }

  function doVote(choice: number) {
    writeContract(config, {
      address: CONTRACT_ADDRESS,
      abi: ABI,
      chainId: config.chains[0].id,
      functionName: "addVote",
      args: [choice],
    })
      .then(() => {
        setShowVotes(choice);
        setMessage("Voto computado com sucesso! Resultados parciais sujeitos a alteração minuto a minuto.");
      })
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }

  function btnVote2Click() {
    setMessage("Conectando na carteira...aguarde...");
    doVote(2);
  }

  function btnVote1Click() {
    setMessage("Conectando na carteira...aguarde...");
    doVote(1);
  }

  function getVotesCount(option: number) {
    if (option === 1)
      return showVotes === option ? Number(voting.votes1) + 1 : Number(voting.votes1);
    else
      return showVotes === option ? Number(voting.votes2) + 1 : Number(voting.votes2);
  }

  return (
    <div className='container px-4 py-5'>
      <div className='row align-items-center'>
        <h1 className='display-5 fw-bold text-body-emphasis lh-1 mb-3'>Webbb3</h1>
        <p className='lead'>Votação on-chain do BBB.</p>
        {
          isExpired()
            ? <p className='lead mb-3'>Votação encerrada. Confira abaixo os resultados.</p>
            : <p className='lead mb-3'>Você tem até {getMaxDate()} para deixar seu voto em um dos participantes abaixo para que ele saia do programa.</p>
        }
      </div>
      <div className='row flex-lg-row-reverse align-items-center g-5 py-5'>
        <div className='col-1'></div>
        <div className='col-5'>
          <h3 className='my-2 d-block mx-auto' style={{ width: 250 }}>{voting.option2}</h3>
          <img src={getImageUrl(voting.option2)} className='d-block mx-auto img-fluid rounded' width={250} height={250} />
          {
            isExpired() || showVotes > 0
              ? <button className='btn btn-secondary p-3 my-2 d-block mx-auto' style={{ width: 250 }} disabled={true}>{getVotesCount(2)}</button>
              : <button className='btn btn-primary p-3 my-2 d-block mx-auto' style={{ width: 250 }} onClick={btnVote2Click}>Quero que saia este</button>
          }
        </div>
        <div className='col-5'>
          <h3 className='my-2 d-block mx-auto' style={{ width: 250 }}>{voting.option1}</h3>
          <img src={getImageUrl(voting.option1)} className='d-block mx-auto img-fluid rounded' width={250} height={250} />
          {
            isExpired() || showVotes > 0
              ? <button className='btn btn-secondary p-3 my-2 d-block mx-auto' style={{ width: 250 }} disabled={true}>{getVotesCount(1)}</button>
              : <button className='btn btn-primary p-3 my-2 d-block mx-auto' style={{ width: 250 }} onClick={btnVote1Click}>Quero que saia este</button>
          }
        </div>
        <div className='col-1'></div>
      </div>
      <div className='row align-items-center'>
        <p className='message'>{message}</p>
      </div>
    </div>
  )
}