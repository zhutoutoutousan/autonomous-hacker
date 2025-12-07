"""
Defensive Strategy Generation Module
"""

from typing import Dict, List
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class StrategyGenerator:
    """Generate defensive retaliation strategies"""
    
    def __init__(self):
        self.strategies = []
    
    def generate_strategy(self, threat_assessment: Dict, profile_data: List[Dict]) -> Dict:
        """Generate comprehensive defensive strategy"""
        logger.info("Generating defensive strategy")
        
        strategy = {
            'timestamp': datetime.now().isoformat(),
            'threat_level': threat_assessment.get('threat_level', 'Low'),
            'immediate_actions': [],
            'short_term_actions': [],
            'long_term_actions': [],
            'platform_specific': {},
            'legal_options': [],
            'intelligence_gathering': []
        }
        
        threat_level = threat_assessment.get('threat_level', 'Low')
        
        # Immediate actions
        strategy['immediate_actions'] = self._get_immediate_actions(threat_level)
        
        # Short-term actions
        strategy['short_term_actions'] = self._get_short_term_actions(threat_level)
        
        # Long-term actions
        strategy['long_term_actions'] = self._get_long_term_actions(threat_level)
        
        # Platform-specific strategies
        strategy['platform_specific'] = self._get_platform_strategies(profile_data)
        
        # Legal options
        strategy['legal_options'] = self._get_legal_options(threat_level)
        
        # Intelligence gathering recommendations
        strategy['intelligence_gathering'] = self._get_intelligence_recommendations(profile_data)
        
        return strategy
    
    def _get_immediate_actions(self, threat_level: str) -> List[str]:
        """Get immediate action items"""
        actions = [
            "Save all evidence (screenshots, URLs, timestamps)",
            "Document the incident with dates and details"
        ]
        
        if threat_level in ['High', 'Medium']:
            actions.append("Block the account on the platform")
            actions.append("Report the account to platform moderators")
        
        if threat_level == 'High':
            actions.append("Enable privacy settings")
            actions.append("Review and secure your own accounts")
        
        return actions
    
    def _get_short_term_actions(self, threat_level: str) -> List[str]:
        """Get short-term action items"""
        actions = [
            "Continue monitoring the account for escalation",
            "Maintain a log of all interactions"
        ]
        
        if threat_level in ['High', 'Medium']:
            actions.append("Consider reporting to multiple platform channels")
            actions.append("Reach out to platform support if available")
        
        if threat_level == 'High':
            actions.append("Consult with legal counsel")
            actions.append("Review your digital footprint and privacy")
        
        return actions
    
    def _get_long_term_actions(self, threat_level: str) -> List[str]:
        """Get long-term action items"""
        actions = [
            "Maintain evidence archive",
            "Review and update privacy settings regularly"
        ]
        
        if threat_level == 'High':
            actions.append("Consider legal action if harassment continues")
            actions.append("Implement stronger security measures")
            actions.append("Consider professional security consultation")
        
        return actions
    
    def _get_platform_strategies(self, profile_data: List[Dict]) -> Dict:
        """Get platform-specific strategies"""
        strategies = {}
        
        for profile in profile_data:
            platform = profile.get('platform', 'unknown')
            
            if platform == 'bilibili':
                strategies['bilibili'] = [
                    "Report to Bilibili moderation team",
                    "Use Bilibili's blocking feature",
                    "Document video IDs and comment IDs",
                    "Consider reporting through official channels"
                ]
            
            elif platform == 'reddit':
                strategies['reddit'] = [
                    "Report to subreddit moderators",
                    "Report to Reddit administrators",
                    "Use Reddit's blocking feature",
                    "Document post/comment permalinks"
                ]
            
            elif platform == 'twitter':
                strategies['twitter'] = [
                    "Report to Twitter/X support",
                    "Use Twitter's blocking and muting features",
                    "Document tweet IDs and timestamps",
                    "Consider Twitter's harassment reporting tools"
                ]
        
        return strategies
    
    def _get_legal_options(self, threat_level: str) -> List[str]:
        """Get legal options"""
        options = [
            "Document all evidence for potential legal use",
            "Review local cyberbullying laws",
            "Review harassment and defamation laws"
        ]
        
        if threat_level == 'High':
            options.append("Consult with an attorney specializing in cyber law")
            options.append("Consider filing a police report if threats are made")
            options.append("Explore civil remedies for defamation/harassment")
        
        return options
    
    def _get_intelligence_recommendations(self, profile_data: List[Dict]) -> List[str]:
        """Get intelligence gathering recommendations"""
        recommendations = [
            "Continue monitoring account activity",
            "Cross-reference with other platforms",
            "Document activity patterns and timelines"
        ]
        
        # Check if we have multiple platforms
        platforms = [p.get('platform') for p in profile_data]
        if len(set(platforms)) > 1:
            recommendations.append("Correlate activity across platforms")
            recommendations.append("Look for common patterns or connections")
        
        return recommendations

