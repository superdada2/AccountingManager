import {class_enum} from '../../../models';
import Promise from 'bluebird';

export function getClass(){
  return class_enum.findAll()
}

export function addClass({data = ''}){
  return class_enum.create({data:data})
}