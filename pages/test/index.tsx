import { Button } from '@/components/button/button';
import {IconButton} from '@/components/icon-buttons/icon-button';
import { Input } from '@/components/input/input';
import React from 'react'
import { AiOutlineGoogle } from 'react-icons/ai'; 'react-icons/ai'

export default function Test(){
    return (
        <div>
            <Input placeholder='test'></Input>
            <IconButton icon={AiOutlineGoogle} />
            <Button label = {"dummy"} col="blue"/>
        </div>
    );
};