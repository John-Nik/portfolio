export default function CodeWrapper() {
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        fullDate = day + '/' + month + '/' + year;

    return (
        <div aria-hidden="true" className={'code-wrapper'}>
            <ol className={'code'}>
                <li className={'codeline codeline1'}>
                    <span className={'white'}>
                        <span className={'const'}>const </span><span className={'dark-blue'}>button </span><span className={'light-red'}>= </span><span className={'dark-blue'}>document</span><span className={'light-red'}>.</span><span className={'dark-blue'}>querySelector("</span><span className={'orange'}>#form-button</span><span className={'dark-blue'}>")</span>;
                    </span>
                </li>
                <li className={'codeline codeline2'}>
                    &nbsp;
                </li>
                <li className={'codeline codeline3'}>
                    <span className={'const'}>const </span><span className={'dark-blue'}>message </span><span className={'light-red'}>= </span><span className={'dark-blue'}>{'{'}</span>
                </li>
                <li className={'codeline codeline4'}>
                    &nbsp;&nbsp;<span className="light-blue">name</span><span className="gray">: </span><span className="orange name-js-input">""</span><span className="white">,</span>
                </li>
                <li className={'codeline codeline5'}>
                    &nbsp;&nbsp;<span className="light-blue">email</span><span className="gray">: </span><span className="orange email-js-input">""</span><span className="white">,</span>
                </li>
                <li className={'codeline codeline6'}>
                    &nbsp;&nbsp;<span className="light-blue">message</span><span className="gray">: </span><span className="orange message-js-input">""</span><span className="white">,</span>
                </li>
                <li className={'codeline codeline7'}>
                    &nbsp;&nbsp;<span className="light-blue">date</span><span className="gray">: </span><span className="orange date-js-input">"{fullDate}"</span>
                </li>
                <li className={'codeline codeline8'}>
                    <span className="dark-blue">{'}'}</span><span className="white">;</span>
                </li>
                <li className={'codeline codeline9'}>
                    &nbsp;
                </li>
                <li className={'codeline codeline10'}>
                    <span className="dark-blue">button</span><span className="white">.</span><span className="light-red">addEventListener</span><span className="yellow-green">(</span><span className="yellow">"click"</span><span className="gray">, </span><span className="pink">{'()'} </span><span className="light-red">{'=>'} </span><span className="green">{'{'}</span>
                </li>
                <li className={'codeline codeline11'}>
                    &nbsp;&nbsp;<span className="white">form.</span><span className="light-red">send</span><span className="pink">(</span><span className="dark-blue">message</span><span className="pink">)</span><span className="white">;</span>
                </li>
                <li className={'codeline codeline12'}>
                    <span className="green">{'}'}</span><span className="yellow-green">)</span>
                </li>
            </ol>
        </div>
    )
}