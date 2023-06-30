import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Space, Tag, Tooltip, theme, Row, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

const { Search } = Input;


const AddMoreTag = ({ parentCallback }) => {
    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);


    useEffect(() => {
        parentCallback(tags);
    }, [tags]);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };
    const showInput = () => {
        setInputVisible(true);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
            //   console.log(tags)
        }
        // setInputVisible(false);
        setInputValue('');
    };

    const handleOnBlur = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
            //   console.log(tags)
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setInputValue('');
    };
    const tagInputStyle = {
        width: '30%',
        verticalAlign: 'top',
    };

    return (

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Space size={[0, 12]} wrap>

                {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={editInputRef}
                                key={tag}
                                size="small"
                                style={tagInputStyle}
                                value={editInputValue}
                                onChange={handleEditInputChange}
                                onBlur={handleEditInputConfirm}
                                onPressEnter={handleEditInputConfirm}
                            />
                        );
                    }
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag
                            key={tag}
                            closable='true'
                            style={{
                                userSelect: 'none',
                            }}
                            onClose={() => handleClose(tag)}
                        >
                            <span
                                onDoubleClick={(e) => {
                                    if (index !== 0) {
                                        setEditInputIndex(index);
                                        setEditInputValue(tag);
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}

            </Space>

            <div>
                {inputVisible ? (
                    <Search
                        ref={inputRef}
                        onSearch={handleInputConfirm}
                        type="text"
                        size="middle"
                        enterButton="Add"
                        allowClear= {false}
                        style={tagInputStyle}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleOnBlur}
                        onPressEnter={handleInputConfirm}
                        
                        
                    />
                ) : (
                    <Button icon={<PlusOutlined />} type="dashed" block onClick={showInput} style={{ fontSize: '13px', width:'30%' }}>
                        Add audit team member
                    </Button>
                )}
            </div>

        </div>
    );
};
export default AddMoreTag;