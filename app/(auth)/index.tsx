import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Login from '@/components/frm-login';
import { View, Text } from 'react-native'
import { JwtPayload } from '@supabase/supabase-js'

export default function Auth() {
    const [claims, setClaims] = useState<JwtPayload | null>(null)
    useEffect(() => {
        supabase.auth.getClaims().then(({ data }) => {
            if(data){
                setClaims(claims)
            }
        })
        supabase.auth.onAuthStateChange(() => {
            supabase.auth.getClaims().then(({ data }) => {
                if(data){
                    setClaims(claims)
                }
            })
        })
    }, [])
    return (
        <View>
            <Login></Login>
            {claims && <Text>{claims.sub}</Text>}
        </View>

    );
}

