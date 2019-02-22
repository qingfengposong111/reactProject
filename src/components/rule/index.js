import React, {Component} from 'react';
import Header from './../publicComponents/header/index'
import './rule.css'
class Rule extends Component {
    render() {
        return (
            <div className="rules">
                <Header data="规则"/>
                <div className="rule-main">
                    <p className="text-content first-line" style={{paddingTop: '50px'}}>一、爆料准则</p>
                    <p className="text-content">
                        1、与民生、教育和社会准则有关的人或事，提供现场图片或视频，并附上简单的文字表述，尽量提供时间、地点、起因、经过等相关信息，务必保证真实。</p>
                    <p className="text-content">2、所反映的事情必须具有一定新闻价值、贴近社会民生，做到客观真实。</p>
                    <p className="text-content">3、所提供信息应具有一定的社会参与度及关注面，并且爆料者必须为爆料的真实性负责。</p>
                    <p className="text-content first-line">二、爆料要求</p>
                    <p className="text-content">1、仅在“蜡笔优学”独家爆料首发，其它网站或渠道已有所爆料信息，计为无效。</p>
                    <p className="text-content">2、爆料时效性强，内容快速及时，对网络的互动交流有带动作用，不涉及到对个人、政府、单位攻击。</p>
                    <p className="text-content">
                        3、在爆料时写清楚具体的地点、时间、起因、经过等等内容，并以客观的立场描述，不夸大、不煽动、不攻击，不编造；力求新闻的时效性、客观性、影响力。</p>
                    <p className="text-content">4、有图有真相（特殊除外），视频爆料更直观，也利于提升爆料信息的总体质量。</p>
                    <p className="text-content first-line">三、爆料奖励</p>
                    <p className="text-content">第一时间供稿：文字描述、图片（视频）、时间、地点、起因、经过等相关信息，一经采用后按阅读量给予相对应的微信转账或支付宝转账形式奖励。</p>
                    <p className="text-content">1、“蜡笔优学”会对爆料人严格保密，保证不会泄露任何爆料者信息。（编造新闻者和违反法律法规者除外）</p>
                    <p className="text-content">2、爆料人直接提供新闻线索至蜡笔优学平台相应爆料入口，按格式填写提交由后台工作人员审核发布。</p>
                    <p className="text-content">
                        1)、“蜡笔优学”计划从2018年12月1日起拿出资金（300元/条封顶）用于建立用户爆料专用基金，你敢爆，我敢奖。从12月1日起实施，确保奖励准确无误落实到位（微信转帐或支付宝转账）。</p>
                    <p className="text-content">2)、在发布内容24小时后会对新闻爆料的内容，根据其阅读点击量进行统一汇总，给予金额相对应的奖励。（微信转帐或支付宝转账）</p>
                    <p className="text-content">3)、经采用发布的内容，蜡笔优学相关平台阅读量（一周内）每满100阅读量可奖励1元，单篇封顶奖励为300元。（提现最小金额为10元）；</p>
                    <p className="text-content">4)、同一IP同一篇阅读只做一次阅读计算，每天凌晨计算前一天的爆料文章的阅读佣金；</p>
                    <p className="text-content first-line">四、免责声明：</p>
                    <p className="text-content">
                        1、爆料人对爆料内容真实性、原创性负责，真实客观不得捏造，不能违法和侵犯他人隐私，不得恶意攻击和诽谤他人。对于爆料人所提供的内容所引发的版权、署名权疑议、纠纷，本平台不承担任何责任。</p>
                    <p className="text-content">2、对于语句不通顺，排版太乱的内容，小编有权进行调整。</p>
                    <p className="text-content">3、以上所有爆料凡涉及到别人肖像或车牌、门牌等隐私信息时，小编有义务对照片进行适当的处理，请理解。</p>
                    <p className="text-content">4、爆料如非原创，请注明出处，否则设计原创追究，爆料人将自行承担相关一切责任。</p>
                    <p className="text-content desc">注：奖励规则若有更改，蜡笔优学平台将会提前48小时公布，公布48小时后即生效。</p>
                </div>
            </div>
        )
    }
}
export default Rule;