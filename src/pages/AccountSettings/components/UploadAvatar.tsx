import React, {useState} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import type {UploadChangeParam} from 'antd/es/upload';
import type {RcFile, UploadFile, UploadProps} from 'antd/es/upload/interface';
import {useModel} from "@@/plugin-model/useModel";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const UploadAvatar: React.FC = () => {
  //  获取用户信息
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {}
  // 获取用户头像URL
  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatarUrl) {
        return currentUser.avatarUrl;
      }
      return 'https://img.alicdn.com/bao/uploaded/i1/232692832/O1CN01XERLVq1Wn6Sq5ufB4_!!232692832.jpg_400x400q90';
    }
    return '';
  };
  // 加载状态
  const [loading, setLoading] = useState(false);
  // imgURLState
  const [imageUrl, setImageUrl] = useState<string>(getAvatarURL());


  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:8080/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
      </Upload>

    </>
  );
};

export default UploadAvatar;
