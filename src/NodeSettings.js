import React, { useState } from 'react';

export default function NodeSettings({dialobild}){
    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const buttonStyles = {
        position: 'fixed',
        top: '50%',
        right: isOpen ? '33%' : '0',
        transform: 'translateY(-50%) rotate(-90deg)',
    };

    const containerStyles = {
        position: 'fixed',
        right: 0,
        top: '10%',
        width: '33%',
        height: '80%',
        padding: isOpen ? '1em' : 'none',
        backgroundColor: 'lightgray',
        border: '1px solid black',
        transition: 'width 0.3s ease',

    };

    const inputStyle = {
        width: "100%"
    }

    return (
        <div>
            {dialobild.activeNode &&
                <button
                    style={buttonStyles}
                    onClick={toggleOpen}> {isOpen ? 'Закрыть' : 'Открыть'} {dialobild.activeNode && "узел " + dialobild.activeNode.id}
                </button>}

            {dialobild.activeNode && isOpen &&
                <div style={containerStyles}>
                    <div style={{textAlign: "left"}}>
                        <h3 style={{textAlign: "center"}}>Характеристики узла №{dialobild.activeNode.id}</h3>
                        Значение: <input style={inputStyle} type="text" value={dialobild.activeNode.content}
                                         onChange={e => {
                                             dialobild.activeNode.content = e.target.value;
                                             dialobild.updateNodeProperty()
                                         }}/>

                        Тип узла:
                        <select onChange={(e) => {
                            dialobild.activeNode.nodeType = e.target.value;
                            dialobild.updateNodeProperty();
                        }}>
                            {Object.keys(dialobild.nodeTypes).map((type) => (
                                <option value={type} selected={type === dialobild.activeNode.nodeType}>{type}</option>
                            ))}
                        </select>


                        <button
                            style={{display: "block", backgroundColor: "palevioletred"}}
                            onClick={() => dialobild.deleteNode(dialobild.activeNode)}>Удалить узел
                        </button>

                        <h4>Связи и влияние других узлов:</h4>

                        {dialobild.selectionMode &&
                            <div>
                                <hr/>
                                Изменение связей ({dialobild.selectionMode}):
                                <button onClick={() => dialobild.setSelectionMode(null)}>
                                    Готово
                                </button>
                            </div>
                        }

                        <hr/>
                        Активно если одно из:

                        {dialobild.selectionMode !== "mustHave" &&
                            <button onClick={() => dialobild.setSelectionMode("mustHave")}>
                                Изменить
                            </button>
                        }


                        <hr/>
                        Активно если все из:
                        {dialobild.selectionMode !== "mustHaveAll" &&
                            <button onClick={() => dialobild.setSelectionMode("mustHaveAll")}>
                                Изменить
                            </button>
                        }

                        <hr/>
                        Неактивно если хотя бы одно из:
                        {dialobild.selectionMode !== "mustNotHave" &&
                            <button onClick={() => dialobild.setSelectionMode("mustNotHave")}>
                                Изменить
                            </button>
                        }
                    </div>
                </div>}
        </div>
    );

}