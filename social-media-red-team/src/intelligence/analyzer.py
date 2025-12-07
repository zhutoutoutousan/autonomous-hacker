"""
Intelligence Analysis and Correlation Module
"""

import json
from typing import Dict, List, Optional
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class IntelligenceAnalyzer:
    """Analyze and correlate intelligence from multiple sources"""
    
    def __init__(self):
        self.profiles = []
        self.correlations = []
    
    def add_profile(self, profile_data: Dict):
        """Add a profile for analysis"""
        self.profiles.append(profile_data)
    
    def correlate_profiles(self) -> Dict:
        """Correlate information across platforms"""
        logger.info("Correlating profiles across platforms")
        
        correlation = {
            'timestamp': datetime.now().isoformat(),
            'platforms': [],
            'common_indicators': [],
            'cross_platform_analysis': {}
        }
        
        # Extract platform info
        for profile in self.profiles:
            platform = profile.get('platform', 'unknown')
            correlation['platforms'].append(platform)
        
        # Cross-platform analysis
        if len(self.profiles) > 1:
            correlation['cross_platform_analysis'] = self._cross_platform_analysis()
        
        return correlation
    
    def _cross_platform_analysis(self) -> Dict:
        """Perform cross-platform analysis"""
        analysis = {
            'profile_consistency': 'Unknown',
            'activity_patterns': {},
            'threat_level': 'Low'
        }
        
        # Aggregate risk scores
        risk_scores = []
        for profile in self.profiles:
            profile_analysis = profile.get('analysis', {})
            risk_score = profile_analysis.get('risk_score', 0)
            risk_scores.append(risk_score)
        
        avg_risk = sum(risk_scores) / len(risk_scores) if risk_scores else 0
        
        if avg_risk >= 70:
            analysis['threat_level'] = 'High'
        elif avg_risk >= 40:
            analysis['threat_level'] = 'Medium'
        else:
            analysis['threat_level'] = 'Low'
        
        return analysis
    
    def generate_threat_assessment(self) -> Dict:
        """Generate comprehensive threat assessment"""
        assessment = {
            'timestamp': datetime.now().isoformat(),
            'profiles_analyzed': len(self.profiles),
            'overall_risk_score': 0,
            'threat_level': 'Low',
            'indicators': [],
            'recommendations': []
        }
        
        # Calculate overall risk
        risk_scores = []
        for profile in self.profiles:
            profile_analysis = profile.get('analysis', {})
            risk_score = profile_analysis.get('risk_score', 0)
            risk_scores.append(risk_score)
            
            # Collect indicators
            indicators = profile_analysis.get('threat_indicators', [])
            assessment['indicators'].extend(indicators)
        
        if risk_scores:
            assessment['overall_risk_score'] = sum(risk_scores) / len(risk_scores)
        
        # Determine threat level
        if assessment['overall_risk_score'] >= 70:
            assessment['threat_level'] = 'High'
        elif assessment['overall_risk_score'] >= 40:
            assessment['threat_level'] = 'Medium'
        
        # Generate recommendations
        assessment['recommendations'] = self._generate_recommendations(assessment)
        
        return assessment
    
    def _generate_recommendations(self, assessment: Dict) -> List[str]:
        """Generate defensive recommendations"""
        recommendations = []
        
        risk_score = assessment.get('overall_risk_score', 0)
        threat_level = assessment.get('threat_level', 'Low')
        
        # Basic recommendations
        recommendations.append("Document all interactions and save evidence")
        recommendations.append("Review platform Terms of Service for reporting options")
        
        if threat_level == 'High':
            recommendations.append("Consider blocking the account immediately")
            recommendations.append("Report to platform moderators/administrators")
            recommendations.append("Document all evidence for potential legal action")
            recommendations.append("Consider privacy settings review")
        
        elif threat_level == 'Medium':
            recommendations.append("Monitor account activity")
            recommendations.append("Consider blocking if harassment continues")
            recommendations.append("Report if behavior escalates")
        
        else:
            recommendations.append("Continue monitoring")
            recommendations.append("Maintain evidence of interactions")
        
        # Legal recommendations
        recommendations.append("Consult legal counsel if harassment persists")
        recommendations.append("Review local cyberbullying and harassment laws")
        
        return recommendations

