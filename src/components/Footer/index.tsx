import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import {GITHUB_URL} from "@/constants";

const Footer: React.FC = () => {
  const defaultMessage = '小胡';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'star',
          title: '知识星球',
          href: 'http://wuluwulu.cn',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined/> humeng Github</>,
          href: GITHUB_URL,
          blankTarget: true,
        },

      ]}
    />
  );
};
export default Footer;
