import React from 'react';
import { colors } from '@/tokens/colors';
import { spacing } from '@/tokens/spacing';
import { typography } from '@/tokens/typography';
import { radius } from '@/tokens/radius';
import { shadow } from '@/tokens/shadow';

export const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: colors.secondary[100],
      borderBottom: `1px solid ${colors.secondary[300]}`,
      boxShadow: shadow.sm,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: `0 ${spacing.lg}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: `calc(4*${spacing.lg})`,
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.md,
        }}>
          <div style={{
            width: `calc(2.5*${spacing.lg})`,
            height: `calc(2.5*${spacing.lg})`,
            backgroundColor: colors.primary[500],
            borderRadius: radius.md,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.secondary[100],
            fontWeight: typography.fontWeightBold,
            fontSize: typography.fontSizeLg,
          }}>
            L
          </div>
          <div>
            <h1 style={{
              fontSize: typography.fontSizeBase,
              fontWeight: typography.fontWeightBold,
              color: colors.primary[700],
              margin: 0,
              lineHeight: 1,
            }}>
              Hanghae Company
            </h1>
            <p style={{
              fontSize: '11px',
              color: colors.secondary[500],
              margin: 0,
              lineHeight: 1,
              marginTop: spacing.xs,
            }}>
              Design System Migration Project
            </p>
          </div>
        </div>


        {/* User Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            textAlign: 'right',
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a202c',
            }}>
              Demo User
            </div>
            <div style={{
              fontSize: '12px',
              color: '#718096',
            }}>
              demo@example.com
            </div>
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#e3f2fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#007bff',
            fontWeight: '600',
            fontSize: '16px',
          }}>
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
