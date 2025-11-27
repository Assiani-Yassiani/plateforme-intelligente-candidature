package com.alibou.security.respense;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatistiqueRespense {
    private String nonvues ;
    private String accpetees ;
    private String refusees ;
    private String ouverts ;
    private String expires ;
    private String faits ;
    private String programmes ;


}
